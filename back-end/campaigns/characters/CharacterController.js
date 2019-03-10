import {
	promiseQuery,
} from '../../utility';

import * as spellsController from './CharacterSpellsController';
import * as proficienciesController from './CharacterProficienciesController';

/**
 * @description Returns all characters in the database attached to a given campaign
 */
export const getAllCharacters = async (path, query, user, connection) => {
	const { campaignID } = path;
	
	const results = await promiseQuery(
		connection,
		`
			SELECT
				dungeonbuddiesdb.character.characterID,
				dungeonbuddiesdb.character.characterName,
				dungeonbuddiesdb.character.isNPC
			FROM 
				characterlist
					JOIN
				dungeonbuddiesdb.character ON dungeonbuddiesdb.character.characterID = characterlist.characterID
			WHERE 
				characterlist.campaignID = :campaignID
		`,
		{ campaignID }
	);

	return results;
};

/**
 * @description Inserts a new character into the database
 */
export const createNewCharacter = async (path, query, user, connection, body) => {
	const { campaignID } = path;
	const { characterName, isNPC } = body;

	const results = await promiseQuery(
		connection,
		`
			INSERT INTO dungeonbuddiesdb.character
			(characterName, klassID, raceID, hp, height, weight, age, skinDesc, hairDesc, isNPC)
			VALUES
			(:characterName, 1, 1, 0, "", 0, 0, "", "", :isNPC)
		`,
		{ characterName, isNPC }
	);

	await promiseQuery(
		connection,
		`
			INSERT INTO characterlist
			(characterID, campaignID)
			VALUES
			(:characterID, :campaignID)
		`,
		{ campaignID, characterID: results.insertId }
	);

	return {
		characterID: results.insertId,
	};
};

/**
 * @description Get data for a specific character
 */
export const getCharacter = async (path, query, user, connection) => {
	const { characterID } = path;

	const characterPromise = promiseQuery(
		connection,
		`
			SELECT * FROM dungeonbuddiesdb.character
			WHERE characterID = :characterID
		`,
		{ characterID },
	);

	const spellsPromise = spellsController.getSpellsForCharacter(characterID, connection);
	const proficienciesPromise = proficienciesController.getProficienciesForCharacter(characterID, connection);

	const [
		character,
		spells,
		proficiencies,
	] = await Promise.all([ characterPromise, spellsPromise, proficienciesPromise ]);

	return {
		...character[0],
		spells,
		proficiencies,
		ac: 15,
	};
};
