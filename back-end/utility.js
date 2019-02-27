/**
 * @description This file contains server utility functions to simplify various
 * server functions
 * 
 * @author Joseph Stewart
 */

import STATUS_CODES from 'http-status-codes';
import mysql from 'mysql';

let databaseCredentials;
try {
	databaseCredentials = require('./database-credentials.json');
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
function queryFormat (query, values) {
	if (!values) return query;
	query = query.replace(/:"(\w+)"/g, function (txt, key) {
		if (values.hasOwnProperty(key)) {
			if (Array.isArray(values[key])) {
				return this.escape(values[key].join(','));
			}
			return `"${this.escape(values[key])}"`;
		}
		return 'NULL';
	}.bind(this));
	return query.replace(/:(\w+)/g, function (txt, key) {
		if (values.hasOwnProperty(key)) {
			return this.escape(values[key]);
		}
		return 'NULL';
	}.bind(this));
}

// Define our database connection pool
const pool = mysql.createPool({
	user: databaseCredentials.user,
	password: databaseCredentials.pass,
	host: 'localhost',
	database: 'dungeonbuddiesdb',
	typeCast,
	queryFormat,
});

/**
 * @description Returns a promise that resolves to a database connection
 */
export const getSQLConnection = () => (
	new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				return reject(err);
			}
			return resolve(connection);
		});
	})
);

/**
 * @description Wraps a mysql query in a promise for readability (so it can be used with async/await)
 */
export const promiseQuery = (connection, query, options) => (
	new Promise((resolve, reject) => {
		const args = [];
		if (options) {
			args.push(options);
		}
		
		connection.query(
			query,
			...args,
			(err, results) => {
				if (err) {
					reject(err);
				}
				resolve(results);
			}
		);
	})
);

/**
 * @description Ends an http request with a internal server error error code.
 * @param {Object} response Express request object
 * @param {Object} err Error to be sent to the client
 */
export const serverError = (response, err) => {
	response.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(err || { reason: 'Internal Server Error' });
};

/**
 * @description This function wraps a server method so that it can be connected to an API route
 * @param {Function} callback The server method to be wrapped
 * @param {boolean} withDBConnection If this parameter is true, a database connection will be passed
 * into the callback as the fourth parameter.
 */
export const asRouteFunction = (callback, withDBConnection) => async (request, response) => {
	try {
		let connection;
		if (withDBConnection) {
			connection = await getSQLConnection();
		}
		const results = await callback(request.params, request.query, request.user, connection, request.body, request.files);
		return response.json(results || {});
	} catch (err) {
		return serverError(response, err);
	}
};