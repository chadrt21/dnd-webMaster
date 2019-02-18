/**
 * @description This file contains server utility functions to simplify various
 * server functions
 * 
 * @author Joseph Stewart
 */

import STATUS_CODES from 'http-status-codes';

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
 */
export const asRouteFunction = callback => async (request, response) => {
	try {
		const results = await callback(request.params, request.query, request.user);
		return response.json(results || {});
	} catch (err) {
		return serverError(response, err);
	}
};