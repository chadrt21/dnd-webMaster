/* eslint-disable no-undef */
import 'babel-polyfill';
import testUser from './test-user-object';

const promiseQuery = (connection, query, options) => new Promise((resolve, reject) => {
	const params = [
		options,
		(err, results) => {
			if (err) {
				reject(err);
			}
			resolve(results);
		},
	].filter(item => item);
	connection.query(query, ...params);
});

export default async connection => {
	const campaignIDs = (await promiseQuery(
		connection,
		`
			SELECT campaignID 
			FROM
				campaignlist
					JOIN
				dm ON campaignlist.dmID = dm.dmID
			WHERE dmUserName = :email
		`,
		{ email: testUser.email }
	)).map(result => result.campaignID);

	if (campaignIDs.length > 0) {
		// Delete all characters created by this campaign
		const characterIDs = (await promiseQuery(
			connection,
			`
				SELECT characterID FROM characterlist WHERE campaignID IN (:campaignIDs)
			`,
			{ campaignIDs }
		)).map(result => result.characterID);

		await promiseQuery(
			connection,
			`
				DELETE FROM characterlist WHERE campaignID IN (:campaignIDs)
			`,
			{ campaignIDs }
		);
		await promiseQuery(
			connection,
			`
				DELETE FROM \`character\` WHERE characterID IN (:characterIDs)
			`,
			{ characterIDs }
		);

		// Delete all of the linked playlists created by this campaign
		await promiseQuery(
			connection,
			`
				DELETE FROM campaignhasspotifyplaylist WHERE campaignID IN (:campaignIDs)
			`,
			{ campaignIDs }
		);

		// Delete all of the folders created by this campaign
		await promiseQuery(
			connection,
			`
				DELETE FROM notefolder WHERE campaignID IN (:campaignIDs)
			`,
			{ campaignIDs }
		);

		// Delete all of the notes created by this campaign
		await promiseQuery(
			connection,
			`
				DELETE FROM note WHERE campaignID IN (:campaignIDs)
			`,
			{ campaignIDs }
		);

		// Delete all of the campaigns created by this test users
		await promiseQuery(
			connection,
			`
			DELETE FROM campaignlist WHERE campaignID IN (:campaignIDs)
		`,
			{ campaignIDs }
		);
		await promiseQuery(
			connection,
			`
			DELETE FROM campaign WHERE campaignID IN (:campaignIDs)
		`,
			{ campaignIDs }
		);
	}

	await promiseQuery(
		connection,
		`
			DELETE FROM dm WHERE dmUserName = :email
		`,
		{ email: testUser.email }
	);
};
