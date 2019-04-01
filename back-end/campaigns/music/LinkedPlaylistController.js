import {
	promiseQuery,
} from '../../utility';

/**
 * @description Get all playlists that the user has linked to this campaign
 */
export const getLinkedPlaylists = async (path, query, user, connection) => {
	const { campaignID } = path;

	const results = await promiseQuery(
		connection,
		`
			SELECT *
			FROM
				campaignhasspotifyplaylist
			WHERE
				campaignID = :campaignID
		`,
		{ campaignID }
	);

	return results;
};

/**
 * @description Link new playlists to this campaign
 */
export const linkSpotifyPlaylists = async (path, query, user, connection, body) => {
	const { campaignID } = path;
	const {
		items,
	} = body;

	const insertStatements = [];
	const insertStatementObject = {};

	for (let i = 0; i < items.length; i++) {
		insertStatements.push(
			`(:campaignID, :spotifyUri${i}, :type${i}, ${items[i].hotkey ? `:hotkey${i}` : '\'\''}, :playlistName${i})`
		);
		insertStatementObject[`spotifyUri${i}`] = items[i].spotifyUri;
		insertStatementObject[`type${i}`] = items[i].type;
		insertStatementObject[`hotkey${i}`] = items[i].hotkey;
		insertStatementObject[`playlistName${i}`] = items[i].playlistName;
	}

	await promiseQuery(
		connection,
		`
			DELETE FROM campaignhasspotifyplaylist
			WHERE campaignID = :campaignID
		`,
		{ campaignID }
	);

	if (insertStatements.length > 0) {
		await promiseQuery(
			connection,
			`
				INSERT INTO campaignhasspotifyplaylist
					(campaignID, spotifyUri, type, hotkey, playlistName)
				VALUES
					${insertStatements.join(', ')}
			`,
			{ campaignID, ...insertStatementObject }
		);
	}

	return {
		added: true,
	};
};

/**
 * @description Unlink a playlist from this campaign
 */
export const unlinkSpotifyPlaylists = async (path, query, user, connection) => {
	const { campaignID, spotifyUris } = path;

	const spotifyUriArray = spotifyUris.split(',');

	
	const result = await promiseQuery(
		connection,
		`
			DELETE FROM campaignhasspotifyplaylist
			WHERE
				campaignID = :campaignID
					AND
				spotifyUri IN (:spotifyUriArray)
		`,
		{ campaignID, spotifyUriArray }
	);
	
	return {
		deleted: result.affectedRows > 0,
	};
};

/**
 * @description Changes a linked playlists hotkey
 */
export const changePlaylistHotkey = async (path, query, user, connection, body) => {
	const { campaignID } = path;
	const { hotkey, spotifyUri } = body;

	const result = await promiseQuery(
		connection,
		`
			UPDATE campaignhasspotifyplaylist
			SET hotkey = :hotkey
			WHERE
				campaignID = :campaignID
					AND
				spotifyUri = :spotifyUri
		`,
		{ campaignID, hotkey, spotifyUri }
	);

	return {
		updated: result.changedRows > 0,
	};
};
