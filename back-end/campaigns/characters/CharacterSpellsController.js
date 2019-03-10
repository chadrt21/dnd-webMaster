import {
	promiseQuery,
} from '../../utility';

/**
 * @description Gets all of the spells for a specific character
 */
export const getSpellsForCharacter = (characterID, connection) => promiseQuery(
	connection,
	`
		SELECT
			spell.spellID,
			spellName,
			1 as level
		FROM
			spelllist
				JOIN
			spell ON spelllist.spellID = spell.spellID
		WHERE
			characterID = :characterID
	`,
	{ characterID }
);