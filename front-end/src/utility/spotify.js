/* eslint-disable no-console */
/* eslint-disable no-undef */
import * as STATUS_CODES from 'http-status-codes';
let token;
let player;

/**
 * @description When the Spotify SDK is ready, lets check if we have our token
 */
window.onSpotifyWebPlaybackSDKReady = () => {
	player = new Spotify.Player({
		name: 'Campaign Buddy Music Tool',
		getOAuthToken: async callback => {
			token = await getToken();
			callback(token);
		},
	});

	// Error handling
	player.addListener('initialization_error', ({ message }) => { console.error(message); });
	player.addListener('authentication_error', ({ message }) => { console.error(message); });
	player.addListener('account_error', ({ message }) => { console.error(message); });
	player.addListener('playback_error', ({ message }) => { console.error(message); });

	// Playback status updates
	player.addListener('player_state_changed', state => { console.log(state); });

	// Ready
	player.addListener('ready', ({ device_id }) => {
		console.log('Ready with Device ID', device_id);
	});

	// Not Ready
	player.addListener('not_ready', ({ device_id }) => {
		console.log('Device ID has gone offline', device_id);
	});

	// Connect to the player!
	player.connect();
};

/**
 * @description Makes an request to https://api.spotify.com/v1/{uri}
 */
export const makeRequest = async (uri, options) => {
	// Do we have a token already? If we do, then try and get one from the server
	if (!token) {
		token = await getToken();
		// If we still don't have a token, the user has not given us permission to use their spotify
		if (!token) {
			throw new Error('User is not authenticated with Spotify');
		}
	}
	// Try the actual request
	let response = await fetch(`https://api.spotify.com/v1${uri}`, options);

	// If we are unauthorized, then try to get a token cause it may be expired and retry the request
	if (response.status === STATUS_CODES.UNAUTHORIZED) {
		token = await getToken();
		response = await fetch(`https://api.spotify.com/v1${uri}`, options);

		// If we are still unauthorized, clear the tokens in the database because they are clearly 
		if (response.status === STATUS_CODES.UNAUTHORIZED) {
			await fetch('/api/spotify/clear-tokens');
			throw new Error('Access token is not working');
		}
	}
	return response;
};

/**
 * @description Returns true if the user has authorized CB to use their spotify account
 */
export const hasSpotifyAccess = async () => {
	if (!token) {
		token = await getToken();
		if (!token) {
			return false;
		}
	}
	return true;
};

/**
 * @description Get access token from the server
 */
const getToken = async () => {
	const response = await fetch(
		'/api/spotify/access-token',
		{
			credentials: 'include',
		}
	);
	if (response.status === STATUS_CODES.UNAUTHORIZED) {
		return false;
	}
	const jsonResponse = await response.json();
	return jsonResponse.token;
};
