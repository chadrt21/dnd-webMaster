import {
	asRouteFunction,
} from '../utility';

import * as campaignRoutes from './CampaignsController';

export default app => {
	app.route('/api/campaigns/:campaignID')
		.get(asRouteFunction(campaignRoutes.checkIfCampaignExists, true));

	app.route('/api/campaigns')
		.get(asRouteFunction(campaignRoutes.getAllCampaigns, true));

	app.route('/api/campaigns')
		.post(asRouteFunction(campaignRoutes.createNewCampaign, true));
};