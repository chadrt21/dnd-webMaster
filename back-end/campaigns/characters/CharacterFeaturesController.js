import {
	promiseQuery,
} from '../../utility';

export const getKlassFeaturesForCharacter = (character, connection) => promiseQuery(
	connection,
	`
		SELECT
			feat.*
		FROM
			featklasslist
				JOIN
			feat ON feat.featID = featklasslist.featID
		WHERE
			klassID = :klassID
				AND
			featLevel <= :level
				AND
			featLevel > 0
	`,
	{ klassID: character.klassID, level: character.level }
);
