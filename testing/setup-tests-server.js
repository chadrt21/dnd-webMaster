/* eslint-disable no-undef */
import 'babel-polyfill';
import mysql from 'mysql';
import testUser from './test-user-object';

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

beforeAll(async () => {
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
});

afterAll(async () => {
	const connection = await getConnection(pool);

	await promiseQuery(
		connection,
		`
			DELETE FROM dm WHERE dmUserName = :email
		`,
		{ email: testUser.email }
	);
	connection.release();

	closePool(pool);
});
