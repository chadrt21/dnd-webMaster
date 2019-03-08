// Import your component here
import Character from './character';
import SearchTool from './search';
import Notes from './notes';
import Music from './music';
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
		name: 'character',
		displayName: 'Character Tool',
		defaultLabel: 'Character',
		component: Character,
	},
	{
		name: 'search',
		displayName: 'Search Tool',
		defaultLabel: 'Spells Search',
		component: SearchTool,
	},
	{
		name: 'notes',
		displayName: 'Notes Tool',
		defaultLabel: 'Notes',
		component: Notes,
	},
	{
		name: 'music',
		displayName: 'Music Tool',
		defaultLabel: 'Music',
		component: Music,
	},
	{
		name: 'diceRoller',
		displayName: 'Dice Roll',
		defaultLabel: 'Dice Roller',
		component: diceRoller,
	},
];