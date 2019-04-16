/* eslint-disable no-console */
/* eslint-disable no-undef */

import 'babel-polyfill';
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

