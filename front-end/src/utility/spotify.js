/* eslint-disable no-console */
/* eslint-disable no-undef */
import * as STATUS_CODES from 'http-status-codes';
let token;
let player;
let deviceID;
const stateHooksToRegister = [];
const stateHooksToUnregister = [];

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

	while (stateHooksToRegister.length > 0) {
		player.addListener('player_state_changed', stateHooksToRegister.shift());
	}

	while (stateHooksToUnregister.length > 0) {
		player.addListener('player_state_changed', stateHooksToUnregister.shift());
	}

	// Ready
	player.addListener('ready', ({ device_id }) => {
		// When the device is ready, set the singleton variable and take playback control for CB
		deviceID = device_id;
	});

	// Not Ready
	player.addListener('not_ready', async ({ device_id }) => {
		console.log('Not ready with deviceID ', device_id);
	});

	// Connect to the player!
	player.connect();
};

/**
 * @description Goes back to the previous track in the web player if available
 */
export const previous = () => {
	if (player) {
		player.previousTrack();
	}
};

/**
 * @description Skips to the next track in the web player if available
 */
export const skip = () => {
	if (player) {
		player.nextTrack();
	}
};

/**
 * @description Allows the UI to toggle the pause/play state of the player
 */
export const togglePlay = () => {
	if (player) {
		player.togglePlay();
	}
};

/**
 * @description Allows the UI to get the state of the callback player at any time
 */
export const getCurrentPlayerState = async () => {
	if (!player) {
		return null;
	}

	const state = await player.getCurrentState();
	return state;
};

/**
 * @description Allows the UI to register callback functions to be called whenever the player state changes
 */
export const registerStateHook = async callback => {
	if (player) {
		player.addListener(
			'player_state_changed',
			callback
		);
	} else {
		stateHooksToRegister.push(callback);
	}
};

/**
 * @description Allows the UI to deregister a callback function when it doesn't need it anymore
 */
export const unregisterStateHook = callback => {
	if (player) {
		player.removeListener(
			'player_state_changed',
			callback
		);
	} else {
		stateHooksToUnregister.push(callback);
	}
};

/**
 * @description Begins playing a playlist through the web SDK
 * @param {string} playlistUri The URI of the playlist to be played
 */
export const playPlaylist = async playlistUri => {
	await spotifyPut(
		`/me/player/shuffle?device_id=${deviceID}&state=true`
	);
	const response = await spotifyPut(
		`/me/player/play?device_id=${deviceID}`,
		{
			context_uri: playlistUri,
		}
	);

	return response.status === STATUS_CODES.NO_CONTENT;
};

/**
 * @description A nice little wrapper for make request so we can make spotify api requests from 
 * the client. Requests are made to https://api.spotify.com/v1/{uri}. Documentation can be found at
 * https://developer.spotify.com/documentation/
 */
export const spotifyGet = uri => makeRequest(uri, {
	method: 'GET',
	headers: {
		'Authorization': `Bearer ${token}`,
	},
});

/**
 * @description A nice little wrapper for make request so we can make spotify api requests from 
 * the client. Requests are made to https://api.spotify.com/v1/{uri}. Documentation can be found at
 * https://developer.spotify.com/documentation/
 */
export const spotifyPut = (uri, body) => makeRequest(uri, {
	method: 'PUT',
	body: JSON.stringify(body),
	headers: {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`,
	},
});

/**
 * @description Makes an request to https://api.spotify.com/v1/{uri}
 */
const makeRequest = async (uri, options) => {
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
