// Import your component here
import ExampleTool from './example';
import Character from './character';
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
		name: 'character',
		displayName: 'Character Tool',
		defaultLabel: 'Character',
		component: Character,
	},
	{
		name: 'diceRoller',
		displayName: 'Dice Roll Tool',
		defaultLabel: 'Dice Roller',
		component: diceRoller,
	},
];