import fetch from 'node-fetch';
import Cryptr from 'cryptr';
import * as STATUS_CODES from 'http-status-codes';

import {
	promiseQuery,
	getSQLConnection,
} from '../utility';

import clientInfo from './spotify-api-creds.json';

const SPOTIFY_URL = 'https://api.spotify.com/v1';
const ACCOUNTS_SPOTIFY_URL = 'https://accounts.spotify.com';
const REDIRECT_URL = 'http://localhost:8085/api/spotify/callback';
const CRYPTR_KEY = process.env.CRYPTR_KEY || 'solascriptura';

const cryptr = new Cryptr(CRYPTR_KEY);

/**
 * @description The link that the user clicks in order to authenticate Spotify in their browser
 */
export const authenticateSpotify = async (request, response) => {
	const { redirectUrl } = request.query;
	const { spotifyAccessToken, spotifyRefreshToken } = await getTokens(request);

	// Check if the token we have is already valid, if it is, just redirect back to the given URL
	const accessTokenValid = await isAccessTokenValid(spotifyAccessToken);

	if (accessTokenValid) {
		return response.redirect(redirectUrl);
	}

	// If it isn't value, check if we can refresh it
	if (spotifyRefreshToken) {
		await refreshAccessToken(spotifyRefreshToken, request);
		return response.redirect(redirectUrl);
	}

	// If we can't refresh it (i.e. this is a first time authentication for this browser),
	// Redirect user back to the redirect url given in the query string
	const scopes = encodeURIComponent([
		'streaming',
		'user-read-birthdate',
		'user-read-email',
		'user-read-private',
		'user-modify-playback-state',
		'user-read-playback-state',
		'user-read-currently-playing',
		'playlist-read-private',
		'playlist-read-collaborative',
	].join(' '));
	return response.redirect(
		`${ACCOUNTS_SPOTIFY_URL}/authorize?redirect_uri=${REDIRECT_URL}&client_id=${clientInfo.client_id}&response_type=code&state=${redirectUrl}&scope=${scopes}`
	);
};

/**
 * @description The route that the spotify authorize endpoint redirects to when the user grants permission
 */
export const spotifyCallback = async (request, response) => {
	const {
		code,
		error,
		state: redirectUrl,
	} = request.query;

	// If there is an error, redirect back to the redirect url given in the original
	// auth request
	if (error) {
		return response.redirect(redirectUrl);
	}

	// If there isn't an error, fetch the tokens
	const authResponse = await fetch(
		`${ACCOUNTS_SPOTIFY_URL}/api/token`,
		{
			method: 'POST',
			body: `grant_type=authorization_code&code=${code}&redirect_uri=${REDIRECT_URL}`,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': `Basic ${Buffer.from(`${clientInfo.client_id}:${clientInfo.client_secret}`).toString('base64')}`,
			},
		}
	).then(response => response.json());

	const success = await setTokens(request, authResponse.access_token, authResponse.refresh_token);

	if (!success) {
		return response.status(STATUS_CODES.INTERNAL_SERVER_ERROR).end();
	}

	// Redirect back to the redirect url given in the original auth request
	return response.redirect(redirectUrl);
};

export const getAccessToken = async (request, response) => {
	const { spotifyAccessToken, spotifyRefreshToken } = await getTokens(request);
	if (!spotifyAccessToken) {
		return response.status(STATUS_CODES.UNAUTHORIZED).json({ reason: 'No access provided' });
	}

	const isTokenValid = await isAccessTokenValid(spotifyAccessToken);

	if (!isTokenValid) {
		const newToken = await refreshAccessToken(spotifyRefreshToken, request);
		return response.json({
			token: newToken,
		});
	}

	return response.json({
		token: spotifyAccessToken,
	});
};

/**
 * @description Clears a users spotify tokens in the database
 */
export const clearTokens = async (request, response) => {
	try {
		await setTokens(request, '', '');
		return response.status(STATUS_CODES.OK).end();
	} catch (err) {
		return response.status(STATUS_CODES.INTERNAL_SERVER_ERROR).end();
	}
};

/**
 * @description Returns whether or not the given access tokens is valid by trying to access
 * the user's profile
 */
const isAccessTokenValid = async accessToken => {
	const response = await fetch(
		`${SPOTIFY_URL}/me`,
		{
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${accessToken}`,
			},
		}
	);

	return response.status === 200;
};

/**
 * @description Refreshes a given access token
 */
const refreshAccessToken = async (spotifyRefreshToken, request) => {
	const refreshedTokenResponse = await fetch(
		`${ACCOUNTS_SPOTIFY_URL}/api/token`,
		{
			method: 'POST',
			body: `grant_type=refresh_token&refresh_token=${spotifyRefreshToken}`,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': `Basic ${Buffer.from(`${clientInfo.client_id}:${clientInfo.client_secret}`).toString('base64')}`,
			},
		}
	).then(response => response.json());
	await setTokens(request, refreshedTokenResponse.access_token);
	return refreshedTokenResponse.access_token;
};

/**
 * @description Returns decrypted spotify access and refresh tokens for the current user
 */
const getTokens = async request => {
	const { id } = request.user;

	// Create a SQL connection
	const connection = await getSQLConnection();

	try {
		// Make the SQL query
		const dbResponse = await promiseQuery(
			connection,
			`
				SELECT
					spotifyAccessToken,
					spotifyRefreshToken
				FROM
					dm
				WHERE
					dmID = :id
			`,
			{ id }
		);
		connection.release();

		// Return the tokens
		return {
			spotifyAccessToken:
				dbResponse[0].spotifyAccessToken ?
					cryptr.decrypt(dbResponse[0].spotifyAccessToken)
					:
					null,
			spotifyRefreshToken:
				dbResponse[0].spotifyRefreshToken ?
					cryptr.decrypt(dbResponse[0].spotifyRefreshToken)
					:
					null,
		};
	} catch (err) {
		// Release the connection and return null for both tokens
		connection.release();
		return {
			spotifyAccessToken: null,
			spotifyRefreshToken: null,
		};
	}
};

/**
 * @description Sets encrypted access and refresh tokens for the current user
 */
const setTokens = async (request, accessToken, refreshToken) => {
	const { id } = request.user;

	const connection = await getSQLConnection();

	try {
		const dbResponse = await promiseQuery(
			connection,
			`
				UPDATE dm
				SET
					spotifyAccessToken = :accessToken
					${refreshToken !== undefined ? ', spotifyRefreshToken = :refreshToken' : ''}
				WHERE
					dmID = :id
			`,
			{
				id,
				accessToken: accessToken ? cryptr.encrypt(accessToken) : '',
				refreshToken: refreshToken ? cryptr.encrypt(refreshToken) : '',
			}
		);
		connection.release();
		return dbResponse.changedRows > 0;
	} catch (err) {
		connection.release();
		return false;
	}
};
