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
	const { folderID } = query;

	const folderSection = folderID ? 'folderID = :folderID' : 'folderID IS NULL';
	const folderParentSection = folderID ? 'parentID = :folderID' : 'parentID IS NULL';

	const notes = await promiseQuery(
		connection,
		`
			SELECT noteTitle, noteID
			FROM
				note
			WHERE
				campaignID = :campaignID
					AND
				isDeleted = 0
					AND
				${folderSection}
		`,
		{ campaignID, folderID }
	);

	const folders = await promiseQuery(
		connection,
		`
			SELECT folderName, noteFolderID, filepath
			FROM
				notefolder
			WHERE
				campaignID = :campaignID
					AND
				NOT isDeleted = 1
					AND
				${folderParentSection}
		`,
		{ campaignID, folderID }
	);

	let currentFolder = {
		filepath: '/',
		folderName: '',
		noteFolderID: null,
	};

	if (folderID) {
		const filepathQueryResults = await promiseQuery(
			connection,
			`
				SELECT folderName, noteFolderID, filepath
				FROM
					notefolder
				WHERE
					noteFolderID = :folderID
						AND
					campaignID = :campaignID
						AND
					isDeleted = 0
			`,
			{ folderID, campaignID }
		);
		
		if (filepathQueryResults.length !== 1) {
			throw new Error('The folder you are looking for does not exist');
		}

		currentFolder = filepathQueryResults[0];
	}

	return {
		folders,
		notes,
		currentFolder,
	};
};

/**
 * @description Creates a new folder on a campaign with an optional parent folder
 */
export const createNewFolder = async (path, query, user, connection, body) => {
	const { campaignID } = path;
	const {
		title,
		parentID,
	} = body;

	const parentIDSQLValue = parentID ? ':parentID' : 'NULL';

	const insertedFolder = await promiseQuery(
		connection,
		`
			INSERT INTO notefolder
				(parentID, folderName, campaignID)
			VALUES
				(${parentIDSQLValue}, :title, ${campaignID})
		`,
		{ title: title || '', parentID, campaignID }
	);

	return {
		created: insertedFolder.insertId > 0,
	};
};

/**
 * @description Creates a new note on a campaign
 */
export const createNewNote = async (path, query, user, connection, body) => {
	const { campaignID } = path;
	const {
		title,
		folderID,
	} = body;

	const folderIDSQLValue = folderID ? ':folderID' : 'NULL';

	const insertedNote = await promiseQuery(
		connection,
		`
			INSERT INTO note
			(noteContent, noteTitle, campaignID, folderID)
			VALUES
			('', :title, :campaignID, ${folderIDSQLValue})
		`,
		{ title: title || '', campaignID, folderID }
	);

	return {
		created: insertedNote.insertId > 0,
	};
};

/**
 * @description Move a note or folder into a destination folder
 */
export const moveIntoFolder = async (path, query, user, connection, body) => {
	const { campaignID, destFolderID } = path;
	const { sourceNoteID, sourceFolderID } = body;

	if (destFolderID !== 'null' && destFolderID !== '0') {
		const hasFolderCheck = await promiseQuery(
			connection,
			`
				SELECT noteFolderID
				FROM
					notefolder
				WHERE
					campaignID = :campaignID
						AND
					noteFolderID = :destFolderID
			`,
			{ campaignID, destFolderID }
		);

		if (hasFolderCheck.length !== 1) {
			throw new Error('You do not have access to this folder');
		}
	}

	let result = {};
	if (sourceNoteID) {
		result = await promiseQuery(
			connection,
			`
				UPDATE note
				SET folderID = :destFolderID
				WHERE
					noteID = :sourceNoteID
						AND
					campaignID = :campaignID
			`,
			{
				sourceNoteID,
				campaignID,
				destFolderID: destFolderID !== 'null' && destFolderID !== '0' ? destFolderID : null,
			}
		);
	} else if (sourceFolderID) {
		result = await promiseQuery(
			connection,
			`
				UPDATE notefolder
				SET parentID = :destFolderID
				WHERE
					noteFolderID = :sourceFolderID
						AND
					campaignID = :campaignID
			`,
			{
				sourceFolderID,
				campaignID,
				destFolderID: destFolderID !== 'null' && destFolderID !== '0' ? destFolderID : null,
			}
		);
	}

	return {
		moved: result.changedRows > 0,
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
