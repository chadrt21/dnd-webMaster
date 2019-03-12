import {
	asRouteFunction,
} from '../utility';

import * as spellsController from './SpellSearchController';

export default app => {
	app.route('/api/search/spells')
		.get(asRouteFunction(spellsController.searchSpells, true));
};