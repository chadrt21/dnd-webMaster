import {
	Toaster,
	Position,
	Intent,
} from '@blueprintjs/core';

const toaster = Toaster.create(
	{
		position: Position.TOP,
	}
);

/**
 * @description Displays an error message using the toast system
 * @param {String} message The error message to display
 */
export const displayError = message => {
	toaster.show({
		message,
		icon: 'error',
		intent: Intent.DANGER,
	});
};
