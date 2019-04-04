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

	app.route('/api/search/klasses')
		.get(asRouteFunction(
			searchController.search({
				tableName: 'klass',
				nameColumn: 'klassName',
				idColumn: 'klassID',
			}),
			true
		));

	app.route('/api/search/races')
		.get(asRouteFunction(
			searchController.search({
				tableName: 'race',
				nameColumn: 'raceName',
				idColumn: 'raceID',
			}),
			true
		));

	app.route('/api/search/equipment')
		.get(asRouteFunction(
			searchController.search({
				tableName: 'equipment',
				idColumn: 'equipmentID',
				nameColumn: 'equipmentName',
			}),
			true
		));

	app.route('/api/search/global')
		.get(asRouteFunction(
			searchController.globalSearch,
			true
		));
};
