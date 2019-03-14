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

/**
 * @description Update proficiencies for character
 */
export const updateProficienciesForCharacter = async (characterID, connection, values) => {
	// Figure out what our old proficiencies are
	const proficiencies = await getProficienciesForCharacter(characterID, connection);
	// See what new ones we are trying to add
	const newProficiencies = values.filter(
		prof => !proficiencies.find(myProf => myProf.proficiencyID === prof)
	);
	// See what ones we are trying to remove
	const removeProficiencies = proficiencies.filter(
		myProf => !values.find(prof => myProf.proficiencyID === prof)
	).map(prof => prof.proficiencyID);

	// If we are trying to remove some proficiencies, form and execute a query
	if (removeProficiencies.length > 0) {
		let removeConditional = '';
		const removeObject = {};
		for (let i = 0; i < removeProficiencies.length; i++) {
			removeConditional = `(${removeConditional}proficiencyID = :remove${i} AND characterID = :characterID)`;
			removeObject[`remove${i}`] = removeProficiencies[i];
			if (i < removeProficiencies.length - 1) {
				removeConditional += 'OR ';
			}
		}
		await promiseQuery(
			connection,
			`DELETE FROM proficiencylist WHERE ${removeConditional}`,
			{ ...removeObject, characterID }
		);
	}

	// If we are trying to add some proficiencies, form and execute a query
	if (newProficiencies.length > 0) {
		const newObject = {};
		const valuesStatement = [];
		for (let i = 0; i < newProficiencies.length; i++) {
			valuesStatement.push(`(:add${i}, :characterID)`);
			newObject[`add${i}`] = newProficiencies[i];
		}
		await promiseQuery(
			connection,
			`
				INSERT INTO proficiencylist
				(proficiencyID, characterID)
				VALUES
				${valuesStatement.join(', ')}
			`,
			{ ...newObject, characterID }
		);
	}
};