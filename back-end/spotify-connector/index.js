import * as spotifyRoutes from './SpotifyController';

export default app => {
	app.route('/api/spotify/authorize')
		.get(spotifyRoutes.authenticateSpotify);

	app.route('/api/spotify/callback')
		.get(spotifyRoutes.spotifyCallback);

	app.route('/api/spotify/access-token')
		.get(spotifyRoutes.getAccessToken);

	app.route('/api/spotify/clear-tokens')
		.get(spotifyRoutes.clearTokens);
};
