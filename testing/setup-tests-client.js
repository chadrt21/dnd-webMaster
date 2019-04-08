/* eslint-disable no-console */
/* eslint-disable no-undef */

const originalConsoleError = console.error;

// Throw an error when we get invalid prop types
console.error = message => {
	if (/(Failed prop type)/.test(message)) {
		throw new Error(message);
	}

	originalConsoleError(message);
};

