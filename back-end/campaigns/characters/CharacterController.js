import {
	promiseQuery,
	getSQLConnection,
	unauthorizedError,
} from '../../utility';

import * as spellsController from './CharacterSpellsController';
import * as proficienciesController from './CharacterProficienciesController';
import * as equipmentController from './CharacterEquipmentController';
import * as featuresController from './CharacterFeaturesController';

/**
 * @description Piece of express middleware to make sure that the character the user
 * is trying to access belongs to the campaign in the url path
 */
export const characterBelongsToCampaign = async (request, response, next) => {
	const { campaignID, characterID } = request.params;

	const connection = await getSQLConnection();

	try {
		const results = await promiseQuery(
			connection,
			`
				SELECT COUNT(*) as count FROM characterlist
				WHERE characterID = :characterID AND campaignID = :campaignID
			`,
			{ campaignID, characterID }
		);

		connection.release();

		if (results[0].count > 0) {
			return next();
		} else {
			return unauthorizedError(response, 'This character does not belong to this campaign');
		}
	} catch (err) {
		connection.release();
	}
};

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

	const character = (await promiseQuery(
		connection,
		`
			SELECT
				\`character\`.*,
				klass.klassName,
				klass.klassID,
				race.raceName,
				race.raceID
			FROM
				\`character\`
					JOIN
				klass ON \`character\`.klassID = klass.klassID
					JOIN
				race ON \`character\`.raceID = race.raceID
			WHERE characterID = :characterID
		`,
		{ characterID },
	))[0];

	const spellsPromise = spellsController.getSpellsForCharacter(characterID, connection);
	const proficienciesPromise = proficienciesController.getProficienciesForCharacter(characterID, connection);
	const equipmentPromise = equipmentController.getEquipmentForCharacter(characterID, connection);
	const klassFeaturesPromise = featuresController.getKlassFeaturesForCharacter(character, connection);

	const [
		spells,
		proficiencies,
		equipment,
		klassFeatures,
	] = await Promise.all([
		spellsPromise,
		proficienciesPromise,
		equipmentPromise,
		klassFeaturesPromise,
	]);

	return {
		...character,
		spells,
		proficiencies,
		equipment,
		klassFeatures,
		ac: 15,
	};
};

/**
 * @description Updates a character in the database
 */
export const updateCharacter = async (path, query, user, connection, body) => {
	const { characterID } = path;
	const {
		field,
		value,
	} = body;

	if (field === 'spells') {
		await spellsController.updateSpellsForCharacter(characterID, connection, value);
		return {
			reload: true,	
		};
	} else if (field === 'proficiencies') {
		await proficienciesController.updateProficienciesForCharacter(characterID, connection, value);
		return {
			reload: true,
		};
	} else if (field === 'equipment') {
		await equipmentController.updateEquipmentForCharacter(characterID, connection, value);
		return {
			reload: true,
		};
	} else if (field === 'race') {
		await promiseQuery(
			connection,
			`
				UPDATE \`character\`
				SET raceID = :value
				WHERE characterID = :characterID
			`,
			{ value, characterID }
		);
		return {
			reload: true,
		};
	} else if (field === 'klass') {
		await promiseQuery(
			connection,
			`
				UPDATE \`character\`
				SET klassID = :value
				WHERE characterID = :characterID
			`,
			{ value, characterID }
		);
		return {
			reload: true,
		};
	} else {
		await promiseQuery(
			connection,
			`
				UPDATE dungeonbuddiesdb.character
				SET :(field) = :value
				WHERE characterID = :characterID
			`,
			{ characterID, value, field }
		);
		return {
			reload: field === 'level',
		};
	}
};