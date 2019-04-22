/* eslint-disable no-console */
/* eslint-disable no-undef */

import 'babel-polyfill';
import mysql from 'mysql';
import testUser from './test-user-object';
import server from '../back-end/server';
import 'whatwg-fetch';

let serverInstance;

const originalConsoleError = console.error;

// Throw an error when we get invalid prop types
console.error = message => {
	if (
		/(Failed prop type)/.test(message) ||
		/(mock fetch request not handled)/.test(message) ||
		/(UnhandledPromiseRejectionWarning)/.test(message)
	) {
		console.log(message);
		throw new Error(message);
	}

	originalConsoleError(message);
};

let pool;
let databaseCredentials;
try {
	databaseCredentials = require('../back-end/database-credentials.json');
} catch (err) {
	databaseCredentials = {
		user: 'root',
		pass: '',
	};
}


/**
 * @description This is a utility function for the mysql module that typecasts the MySQL BIT
 * datatype to a javascript boolean
 */
function typeCast(field, useDefaultTypeCasting) {
	if ((field.type === 'BIT') && (field.length === 1)) {
		const bytes = field.buffer();
		return (bytes[0] === 1);
	}
	return (useDefaultTypeCasting());
}

/**
 * @description This is a utility function for the mysql module that formats queries and safely
 * escapes user entered input
 */
function queryFormat(query, values) {
	if (!values) return query;
	query = query.replace(/:"([\w\d]+)"/g, function (txt, key) {
		if (values.hasOwnProperty(key)) {
			if (Array.isArray(values[key])) {
				return this.escape(values[key].join(','));
			}
			return `"${this.escape(values[key])}"`;
		}
		return 'NULL';
	}.bind(this));
	query = query.replace(/:\(([\w\d]+)\)/g, function (txt, key) {
		if (values.hasOwnProperty(key)) {
			return this.escapeId(values[key]);
		}
		return '';
	}.bind(this));
	return query.replace(/:([\w\d]+)/g, function (txt, key) {
		if (values.hasOwnProperty(key)) {
			return this.escape(values[key]);
		}
		return 'NULL';
	}.bind(this));
}

const closePool = pool => new Promise((resolve, reject) => {
	pool.end(err => {
		if (err) {
			reject(err);
		}
		resolve();
	});
});

const getConnection = pool => new Promise((resolve, reject) => {
	pool.getConnection((err, connection) => {
		if (err) {
			reject(err);
		}
		resolve(connection);
	});
});

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

export const setup = async () => {
	pool = mysql.createPool({
		password: databaseCredentials.pass,
		user: databaseCredentials.user,
		host: 'localhost',
		database: 'dungeonbuddiesdb',
		typeCast,
		queryFormat,
	});
	const connection = await getConnection(pool);

	// Insert user into the database and store their user id
	const result = await promiseQuery(
		connection,
		`
			INSERT INTO dm
			(dmName, dmBio, dmUserName)
			VALUES
			(:name, :bio, :email)
		`,
		{
			name: testUser.name,
			bio: testUser.bio,
			email: testUser.email,
		}
	);

	connection.release();

	// Store the user in a global object
	global.userID = result.insertId;

	serverInstance = server.listen(8086);
	await fetch('/api/auth/login');
};

export const teardown = async () => {
	const connection = await getConnection(pool);

	// Get all of the campaign ids created by this test users
	const campaignIDs = (await promiseQuery(
		connection,
		`
			SELECT campaignID FROM campaignlist WHERE dmUserName = :email
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
	connection.release();

	closePool(pool);
	serverInstance.close();
};
