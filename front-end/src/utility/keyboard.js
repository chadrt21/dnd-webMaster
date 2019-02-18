/**
 * @description This utility file handles keyboard bindings for multiple keyboard combinations
 * @author Joseph Stewart
 */

import keyboard from 'keyboardjs';

/**
 * @description Binds functions to the keyboard shortcut given by their corresponding key in the object
 * So
 * 
 * 	{
 * 		'shift + s': () => console.log('shift + s pressed!'),
 * 	}
 * 
 * would bind that arrow function to the keyboard shortcut 'shift + s'
 * 
 * @param {Object} obj An object where the keys are a keyboard shortcut and the value is a function to be invoked
 */
export const bindKeys = obj => {
	for (const key in obj) {
		keyboard.bind(key, obj[key]);
	}
};

/**
 * @description Call this function with the object used for keyboard binding before the component unmounts
 * @param {Object} obj An object where they keys are a keyboard shortcut and the value is a function to be invoked
 */
export const unbindKeys = obj => {
	for (const key in obj) {
		keyboard.unbind(key, obj[key]);
	}
};