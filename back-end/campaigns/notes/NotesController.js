import {
	promiseQuery,
} from '../../utility';
import sanitizeHtml from 'sanitize-html';

const sanitizeOptions = {
	allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'span' ]),
	allowedAttributes: {
		...sanitizeHtml.defaults.allowedAttributes,
		a: [ 'class', 'href', 'data-*' ],
	},
	transformTags: {
		'*': (tagName, attribs) => {
			if (attribs.class) {
				const classNames = attribs.class.split(' ');
				return {
					tagName,
					attribs: {
						...attribs,
						class: classNames.filter(className => /^ql-.+/.test(className)).join(' '),
					},
				};
			} else {
				return {
					tagName,
					attribs,
				};
			}
		},
	},
};

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
				note
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
			(noteContent, noteTitle, campaignID)
			VALUES
			('', :title, :campaignID)
		`,
		{ title: title || '', campaignID }
	);

	return {
		created: insertedNote.insertId > 0,
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
				campaignID = :campaignID
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
	const { field } = body;
	let { value } = body;

	if (field.toLowerCase() === 'noteid') {
		return {
			reload: true,
		};
	}

	if (field === 'noteContent') {
		value = sanitizeHtml(value, sanitizeOptions);
	}

	const result = await promiseQuery(
		connection,
		`
			UPDATE note
			SET :(field) = :value
			WHERE
				noteID = :noteID
					AND
				campaignID = :campaignID
		`,
		{ campaignID, value, field, noteID }
	);

	return {
		changed: result.changedRows > 0,
	};
};
