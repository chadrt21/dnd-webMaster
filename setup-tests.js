/* eslint-disable no-console */
/* eslint-disable no-undef */

const originalConsoleError = console.error;

console.error = message => {
	if (/(Failed prop type)/.test(message)) {
		throw new Error(message);
	}

	originalConsoleError(message);
};
