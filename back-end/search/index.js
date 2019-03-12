import {
	asRouteFunction,
} from '../utility';

import * as searchController from './SearchController';

export default app => {
	app.route('/api/search/spells')
		.get(asRouteFunction(
			searchController.search({
				tableName: 'spell',
				nameColumn: 'spellName',
				idColumn: 'spellID',
			}),
			true
		));
	
	app.route('/api/search/proficiencies')
		.get(asRouteFunction(
			searchController.search({
				tableName: 'proficiency',
				nameColumn: 'proficiencyName',
				idColumn: 'proficiencyID',
			}),
			true
		));
};