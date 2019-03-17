import {
	promiseQuery,
} from '../../utility';

/**
 * @description Returns all of the notes saved to a campaign
 */
export const getAllNotes = async (path, query, user, connection) => {
	const { campaignID } = path;

	const results = await promiseQuery(
		connection,
		`
			SELECT noteTitle, note.noteID
			FROM
				notelist
					JOIN
				note ON notelist.noteID = note.noteID
			WHERE
				campaignID = :campaignID
		`,
		{ campaignID }
	);

	return results;
};

/**
 * @description Creates a new note on a campaign
 */
export const createNewNote = async (path, query, user, connection, body) => {
	const { campaignID } = path;
	const { title } = body;

	const insertedNote = await promiseQuery(
		connection,
		`
			INSERT INTO note
			(noteContent, noteTitle)
			VALUES
			('', :title)
		`,
		{ title: title || '' }
	);

	const insertedNoteList = await promiseQuery(
		connection,
		`
			INSERT INTO notelist
			(campaignID, noteID)
			VALUES
			(:campaignID, :noteID)
		`,
		{ campaignID, noteID: insertedNote.insertId }
	);

	return {
		created: insertedNoteList.insertId > 0,
	};
};

/**
 * @description Gets a specific note and it's title and content
 */
export const getNote = async (path, query, user, connection) => {
	const { campaignID, noteID } = path;

	const result = await promiseQuery(
		connection,
		`
			SELECT *
			FROM note
			WHERE
				noteID = :noteID
					AND
				noteID IN (
					SELECT noteID FROM notelist WHERE campaignID = :campaignID
				)
		`,
		{ campaignID, noteID }
	);

	return result[0];
};

/**
 * @description Updates a specific note
 */
export const updateNote = async (path, query, user, connection, body) => {
	const { campaignID, noteID } = path;
	const { field, value } = body;

	if (field.toLowerCase() === 'noteid') {
		return {
			reload: true,
		};
	}

	const result = await promiseQuery(
		connection,
		`
			UPDATE note
			SET :(field) = :value
			WHERE
				noteID = :noteID
					AND
				noteID IN (
					SELECT noteID FROM notelist WHERE campaignID = :campaignID
				)
		`,
		{ campaignID, value, field, noteID }
	);

	return {
		changed: result.changedRows > 0,
	};
};
