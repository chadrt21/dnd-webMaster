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

/**
 * @description Update spells for character
 */
export const updateSpellsForCharacter = async (characterID, connection, values) => {
	// Figure out what our old spells are
	const spells = await getSpellsForCharacter(characterID, connection);
	// See what new ones we are trying to add
	const newSpells = values.filter(
		spell => !spells.find(mySpell => mySpell.spellID === spell)
	);
	// See what ones we are trying to remove
	const removeSpells = spells.filter(
		mySpell => !values.find(spell => mySpell.spellID === spell)
	).map(spell => spell.spellID);

	// If we are trying to remove some spells, form and execute a query
	if (removeSpells.length > 0) {
		let removeConditional = '';
		const removeObject = {};
		for (let i = 0; i < removeSpells.length; i++) {
			removeConditional = `(${removeConditional}spellID = :remove${i} AND characterID = :characterID)`;
			removeObject[`remove${i}`] = removeSpells[i];
			if (i < removeSpells.length - 1) {
				removeConditional += 'OR ';
			}
		}
		await promiseQuery(
			connection,
			`DELETE FROM spelllist WHERE ${removeConditional}`,
			{ ...removeObject, characterID }
		);
	}

	// If we are trying to add some spells, form and execute a query
	if (newSpells.length > 0) {
		const newObject = {};
		const valuesStatement = [];
		for (let i = 0; i < newSpells.length; i++) {
			valuesStatement.push(`(:add${i}, :characterID)`);
			newObject[`add${i}`] = newSpells[i];
		}
		await promiseQuery(
			connection,
			`
				INSERT INTO spelllist
				(spellID, characterID)
				VALUES
				${valuesStatement.join(', ')}
			`,
			{ ...newObject, characterID }
		);
	}
};