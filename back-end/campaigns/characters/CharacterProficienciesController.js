import {
	promiseQuery,
} from '../../utility';

/**
 * @description Gets all proficiencies for a specific character
 */
export const getProficienciesForCharacter = (characterID, connection) => promiseQuery(
	connection,
	`
		SELECT
			proficiency.proficiencyID,
			proficiencyName,
			"SKILL" as skill
		FROM
			proficiencylist
				JOIN
			proficiency ON proficiencylist.proficiencyID = proficiency.proficiencyID
		WHERE
			characterID = :characterID
	`,
	{ characterID }
);