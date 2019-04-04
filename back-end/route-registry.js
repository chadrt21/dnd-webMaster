/**
 * @description This file registers all of the controllers with express. Note that
 * individual controller routes should not be defined here. They should be defined
 * in they're index.js file. They should export an function that takes an express
 * app as a parameter and register their individual routes in that function. That
 * function should be imported and called here for each controller.
 * 
 * @author Joseph Stewart
 */

import registerExampleRoutes from './example';
import registerCampaignRoutes from './campaigns';
import registerSearchRoutes from './search';
import registerUserRoutes from './user';
import registerSpotifyRoutes from './spotify-connector';

export default app => {
	registerExampleRoutes(app);
	registerCampaignRoutes(app);
	registerSearchRoutes(app);
	registerUserRoutes(app);
	registerSpotifyRoutes(app);
};