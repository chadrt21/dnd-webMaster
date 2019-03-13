import {
	promiseQuery,
} from '../utility';

export const search = ({
	tableName,
	nameColumn,
	idColumn,
}) => async (path, queryString, user, connection) => {
	const {
		query,
		filter,
		fields,
	} = queryString;

	// Default count to 10 if it is not provided, if it is not a number then don't include a limit
	let { count } = queryString;
	if (!count) {
		count = '10';
	}
	let countSegment = '';
	if (count && !isNaN(count)) {
		countSegment = 'LIMIT :count';
	}

	// Don't include a query condition in the where clause if there is no query provided (i.e. return all)
	const whereSegment = [];
	if (query) {
		whereSegment.push(`${nameColumn} LIKE :query`);
	}

	// Add any filters to the where clause and create an insert object to protect against sql injection
	const sqlFilterObject = {};

	if (filter) {
		filter.split(',').forEach(
			(filterItem, index) => {
				const parts = filterItem.split(':');
				if (parts.length === 2) {
					whereSegment.push(`:(filterID${index}) LIKE :filterValue${index}`);
					sqlFilterObject[`filterID${index}`] = parts[0];
					sqlFilterObject[`filterValue${index}`] = `%${parts[1]}%`;
				}
			}
		);
	}

	// If additional fields are required create an array to include in the query
	let fieldsArray = [];
	if (fields) {
		fieldsArray = fields.split(',');
	}

	// Now we actually execute the query
	const results = await promiseQuery(
		connection,
		`
			SELECT
				${idColumn}, ${nameColumn}${fields ? ', :(fieldsArray)' : '' }
			FROM
				${tableName}
			${whereSegment.length > 0 ? `WHERE ${whereSegment.join(' AND ')}` : ''}
			ORDER BY ${nameColumn}
			${countSegment}
			
		`,
		{
			query: `%${query}%`,
			...sqlFilterObject,
			count: parseInt(count),
			fieldsArray,
		}
	);

	return results;
};
