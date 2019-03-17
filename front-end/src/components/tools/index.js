// Import your component here
import ExampleTool from './example';
<<<<<<< HEAD
import Character from './character';
=======
>>>>>>> 70c713809f9f7910a33c055e985be7d01b682159
import diceRoller from './dice-roller';

/**
 * Add an object to the array below in the following format:
 * 	
 * 	[
 * 		...,
 * 
 * 		{
 * 			name: 'yourtoolname',
 * 			displayName: 'Your Tool Name',
 * 			defaultLabel: 'Tool Name',
 * 			component: ToolComponent
 * 		}
 * 
 * 		...,
 * 	]
 */
export default [
	{
		name: 'example',
		displayName: 'Example Tool',
		defaultLabel: 'Example',
		component: ExampleTool,
	},
	{
<<<<<<< HEAD
		name: 'character',
		displayName: 'Character Tool',
		defaultLabel: 'Character',
		component: Character,
	},
	{
=======
>>>>>>> 70c713809f9f7910a33c055e985be7d01b682159
		name: 'diceRoller',
		displayName: 'Dice Roll',
		defaultLabel: 'Dice Roller',
		component: diceRoller,
	},
];