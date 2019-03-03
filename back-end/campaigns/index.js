import {
	asRouteFunction,
} from '../utility';

import * as campaignRoutes from './CampaignsController';
import * as characterRoutes from './characters/CharacterController';

export default app => {
	app.route('/api/campaigns/:campaignID/exists')
		.get(asRouteFunction(campaignRoutes.checkIfCampaignExists, true));

	app.route('/api/campaigns/:campaignID/characters/:characterID')
		.get(campaignRoutes.userCanAccessCampaign, asRouteFunction(characterRoutes.getCharacter, true));

	app.route('/api/campaigns/:campaignID/characters')
		.get(campaignRoutes.userCanAccessCampaign, asRouteFunction(characterRoutes.getAllCharacters, true));

	app.route('/api/campaigns/:campaignID/characters')
		.post(campaignRoutes.userCanAccessCampaign, asRouteFunction(characterRoutes.createNewCharacter, true));

	app.route('/api/campaigns')
		.get(asRouteFunction(campaignRoutes.getAllCampaigns, true));

	app.route('/api/campaigns')
		.post(asRouteFunction(campaignRoutes.createNewCampaign, true));
};