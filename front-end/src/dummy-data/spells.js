export default [
	{
		index: 1,
		name: 'Acid Arrow',
		desc: [
			'A shimmering green arrow streaks toward a target within range and bursts in a spray of acid. Make a ranged spell attack against the target. On a hit, the target takes 4d4 acid damage immediately and 2d4 acid damage at the end of its next turn. On a miss, the arrow splashes the target with acid for half as much of the initial damage and no damage at the end of its next turn.',
		],
		higher_level: [
			'When you cast this spell using a spell slot of 3rd level or higher, the damage (both initial and later) increases by 1d4 for each slot level above 2nd.',
		],
		page: 'phb 259',
		range: '90 feet',
		components: [
			'V',
			'S',
			'M',
		],
		material: 'Powdered rhubarb leaf and an adder's stomach.',
		ritual: 'no',
		duration: 'Instantaneous',
		concentration: 'no',
		casting_time: '1 action',
		level: 2,
		school: {
			name: 'Evocation',
			url: 'http://www.dnd5eapi.co/api/magic-schools/5',
		},
		classes: [
			{
				name: 'Wizard',
				url: 'http://www.dnd5eapi.co/api/classes/12',
			},
		],
		subclasses: [
			{
				name: 'Lore',
				url: 'http://www.dnd5eapi.co/api/subclasses/2',
			},
			{
				name: 'Land',
				url: 'http://www.dnd5eapi.co/api/subclasses/4',
			},
		],
		url: 'http://www.dnd5eapi.co/api/spells/1',
	},
	{
		index: 2,
		name: 'Acid Splash',
		desc: [
			'You hurl a bubble of acid. Choose one creature within range, or choose two creatures within range that are within 5 feet of each other. A target must succeed on a dexterity saving throw or take 1d6 acid damage.',
			'This spell's damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).',
		],
		page: 'phb 211',
		range: '60 feet',
		components: [
			'V',
			'S',
		],
		ritual: 'no',
		duration: 'Instantaneous',
		concentration: 'no',
		casting_time: '1 action',
		level: 0,
		school: {
			name: 'Conjuration',
			url: 'http://www.dnd5eapi.co/api/magic-schools/2',
		},
		classes: [
			{
				name: 'Sorcerer',
				url: 'http://www.dnd5eapi.co/api/classes/10',
			},
			{
				name: 'Wizard',
				url: 'http://www.dnd5eapi.co/api/classes/12',
			},
		],
		subclasses: [
			{
				name: 'Lore',
				url: 'http://www.dnd5eapi.co/api/subclasses/2',
			},
		],
		url: 'http://www.dnd5eapi.co/api/spells/2',
	},
	{
		index: 3,
		name: 'Aid',
		desc: [
			'Your spell bolsters your allies with toughness and resolve. Choose up to three creatures within range. Each target's hit point maximum and current hit points increase by 5 for the duration.',
		],
		higher_level: [
			'When you cast this spell using a spell slot of 3rd level or higher, a target's hit points increase by an additional 5 for each slot level above 2nd.',
		],
		page: 'phb 211',
		range: '30 feet',
		components: [
			'V',
			'S',
			'M',
		],
		material: 'A tiny strip of white cloth.',
		ritual: 'no',
		duration: '8 hours',
		concentration: 'no',
		casting_time: '1 action',
		level: 2,
		school: {
			name: 'Abjuration',
			url: 'http://www.dnd5eapi.co/api/magic-schools/1',
		},
		classes: [
			{
				name: 'Cleric',
				url: 'http://www.dnd5eapi.co/api/classes/3',
			},
			{
				name: 'Paladin',
				url: 'http://www.dnd5eapi.co/api/classes/7',
			},
		],
		subclasses: [
			{
				name: 'Lore',
				url: 'http://www.dnd5eapi.co/api/subclasses/2',
			},
		],
		url: 'http://www.dnd5eapi.co/api/spells/3',
	},
	{
		index: 4,
		name: 'Alarm',
		desc: [
			'You set an alarm against unwanted intrusion. Choose a door, a window, or an area within range that is no larger than a 20-foot cube. Until the spell ends, an alarm alerts you whenever a Tiny or larger creature touches or enters the warded area. When you cast the spell, you can designate creatures that won't set off the alarm. You also choose whether the alarm is mental or audible.',
			'A mental alarm alerts you with a ping in your mind if you are within 1 mile of the warded area. This ping awakens you if you are sleeping.',
			'An audible alarm produces the sound of a hand bell for 10 seconds within 60 feet.',
		],
		page: 'phb 211',
		range: '30 feet',
		components: [
			'V',
			'S',
			'M',
		],
		material: 'A tiny bell and a piece of fine silver wire.',
		ritual: 'yes',
		duration: '8 hours',
		concentration: 'no',
		casting_time: '1 minute',
		level: 1,
		school: {
			name: 'Abjuration',
			url: 'http://www.dnd5eapi.co/api/magic-schools/1',
		},
		classes: [
			{
				name: 'Ranger',
				url: 'http://www.dnd5eapi.co/api/classes/8',
			},
			{
				name: 'Wizard',
				url: 'http://www.dnd5eapi.co/api/classes/12',
			},
		],
		subclasses: [
			{
				name: 'Lore',
				url: 'http://www.dnd5eapi.co/api/subclasses/2',
			},
		],
		url: 'http://www.dnd5eapi.co/api/spells/4',
	},
	{
		index: 5,
		name: 'Alter Self',
		desc: [
			'You assume a different form. When you cast the spell, choose one of the following options, the effects of which last for the duration of the spell. While the spell lasts, you can end one option as an action to gain the benefits of a different one.',
			'Aquatic Adaptation.',
			' You adapt your body to an aquatic environment, sprouting gills and growing webbing between your fingers. You can breathe underwater and gain a swimming speed equal to your walking speed.',
			'Change Appearance.',
			' You transform your appearance. You decide what you look like, including your height, weight, facial features, sound of your voice, hair length, coloration, and distinguishing characteristics, if any. You can make yourself appear as a member of another race, though none of your statistics change. You also can't appear as a creature of a different size than you, and your basic shape stays the same; if you\'re bipedal, you can't use this spell to become quadrupedal, for instance. At any time for the duration of the spell, you can use your action to change your appearance in this way again.',
			'Natural Weapons.',
			' You grow claws, fangs, spines, horns, or a different natural weapon of your choice. Your unarmed strikes deal 1d6 bludgeoning, piercing, or slashing damage, as appropriate to the natural weapon you chose, and you are proficient with your unarmed strikes. Finally, the natural weapon is magic and you have a +1 bonus to the attack and damage rolls you make using it.',
		],
		page: 'phb 211',
		range: 'Self',
		components: [
			'V',
			'S',
		],
		ritual: 'no',
		duration: 'Up to 1 hour',
		concentration: 'yes',
		casting_time: '1 action',
		level: 2,
		school: {
			name: 'Transmutation',
			url: 'http://www.dnd5eapi.co/api/magic-schools/8',
		},
		classes: [
			{
				name: 'Sorcerer',
				url: 'http://www.dnd5eapi.co/api/classes/10',
			},
			{
				name: 'Wizard',
				url: 'http://www.dnd5eapi.co/api/classes/12',
			},
		],
		subclasses: [
			{
				name: 'Lore',
				url: 'http://www.dnd5eapi.co/api/subclasses/2',
			},
		],
		url: 'http://www.dnd5eapi.co/api/spells/5',
	},
	{
		index: 6,
		name: 'Animal Friendship',
		desc: [
			'This spell lets you convince a beast that you mean it no harm. Choose a beast that you can see within range. It must see and hear you. If the beast’s Intelligence is 4 or higher, the spell fails. Otherwise, the beast must succeed on a wisdom saving throw or be charmed by you for the spell’s duration. If you or one of your companions harms the target, the spells ends.',
		],
		page: 'phb 212',
		range: '30 feet',
		components: [
			'V',
			'S',
			'M',
		],
		material: 'A morsel of food.',
		ritual: 'no',
		duration: '24 hours',
		concentration: 'no',
		casting_time: '1 action',
		level: 1,
		school: {
			name: 'Enchantment',
			url: '',
		},
		classes: [
			{
				name: 'Bard',
				url: 'http://www.dnd5eapi.co/api/classes/2',
			},
			{
				name: 'Cleric',
				url: 'http://www.dnd5eapi.co/api/classes/3',
			},
			{
				name: 'Druid',
				url: 'http://www.dnd5eapi.co/api/classes/4',
			},
			{
				name: 'Ranger',
				url: 'http://www.dnd5eapi.co/api/classes/8',
			},
		],
		subclasses: [],
		url: 'http://www.dnd5eapi.co/api/spells/6',
	},
	{
		index: 7,
		name: 'Animal Messenger',
		desc: [
			'By means of this spell, you use an animal to deliver a message. Choose a Tiny beast you can see within range, such as a squirrel, a blue jay, or a bat. You specify a location, which you must have visited, and a recipient who matches a general description, such as â€œa man or woman dressed in the uniform of the town guardâ€� or â€œa red-haired dwarf wearing a pointed hat.â€� You also speak a message of up to twenty-five words. The target beast travels for the duration of the spell toward the specified location, covering about 50 miles per 24 hours for a flying messenger, or 25 miles for other animals.',
			'When the messenger arrives, it delivers your message to the creature that you described, replicating the sound of your voice. The messenger speaks only to a creature matching the description you gave. If the messenger doesn't reach its destination before the spell ends, the message is lost, and the beast makes its way back to where you cast this spell.',
		],
		higher_level: [
			'If you cast this spell using a spell slot of 3nd level or higher, the duration of the spell increases by 48 hours for each slot level above 2nd.',
		],
		page: 'phb 212',
		range: '30 feet',
		components: [
			'V',
			'S',
			'M',
		],
		material: 'A morsel of food.',
		ritual: 'yes',
		duration: '24 hours',
		concentration: 'no',
		casting_time: '1 action',
		level: 2,
		school: {
			name: 'Enchantment',
			url: 'http://www.dnd5eapi.co/api/magic-schools/4',
		},
		classes: [
			{
				name: 'Bard',
				url: 'http://www.dnd5eapi.co/api/classes/2',
			},
			{
				name: 'Druid',
				url: 'http://www.dnd5eapi.co/api/classes/4',
			},
			{
				name: 'Ranger',
				url: 'http://www.dnd5eapi.co/api/classes/8',
			},
		],
		subclasses: [
			{
				name: 'Lore',
				url: 'http://www.dnd5eapi.co/api/subclasses/2',
			},
		],
		url: 'http://www.dnd5eapi.co/api/spells/7',
	},
	{
		index: 8,
		name: 'Animal Shapes',
		desc: [
			'Your magic turns others into beasts. Choose any number of willing creatures that you can see within range. You transform each target into the form of a Large or smaller beast with a challenge rating of 4 or lower. On subsequent turns, you can use your action to transform affected creatures into new forms.',
			'The transformation lasts for the duration for each target, or until the target drops to 0 hit points or dies. You can choose a different form for each target. A target's game statistics are replaced by the statistics of the chosen beast, though the target retains its alignment and Intelligence, Wisdom, and Charisma scores. The target assumes the hit points of its new form, and when it reverts to its normal form, it returns to the number of hit points it had before it transformed. If it reverts as a result of dropping to 0 hit points, any excess damage carries over to its normal form. As long as the excess damage doesn't reduce the creature's normal form to 0 hit points, it isn't knocked unconscious. The creature is limited in the actions it can perform by the nature of its new form, and it can't speak or cast spells.',
			'The target's gear melds into the new form. The target can't activate, wield, or otherwise benefit from any of its equipment.',
		],
		page: 'phb 212',
		range: '30 feet',
		components: [
			'V',
			'S',
		],
		ritual: 'no',
		duration: 'Up to 24 hours',
		concentration: 'yes',
		casting_time: '1 action',
		level: 8,
		school: {
			name: 'Transmutation',
			url: 'http://www.dnd5eapi.co/api/magic-schools/8',
		},
		classes: [
			{
				name: 'Druid',
				url: 'http://www.dnd5eapi.co/api/classes/4',
			},
		],
		subclasses: [],
		url: 'http://www.dnd5eapi.co/api/spells/8',
	},
];