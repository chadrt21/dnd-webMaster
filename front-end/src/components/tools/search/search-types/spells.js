export default {
	image: 'none',
	data: [
		{
			key: 'klasses',
			display: 'Classes',
			includeInPreview: true,
		},
		{
			key: 'schoolName',
			display: 'School',
		},
		{
			key: 'spellRange',
			display: 'Range',
			includeInPreview: true,
		},
		{
			key: 'duration',
			display: 'Duration',
			includeInPreview: true,
		},
		{
			key: 'castingTime',
			display: 'Casting Time',
		},
		{
			display: 'Components',
			getValue: spell => [
				spell.componentV ? 'V' : null,
				spell.componentM ? 'M' : null,
				spell.componentS ? 'S' : null,
			].filter(spell => spell).join(', ').trim() || 'None',
			includeInPreview: true,
		},
		{
			key: 'spellMaterial',
			display: 'Material',
			hideOnNullValue: true,
		},
		{
			display: 'Ritual',
			getValue: spell => spell.ritual ? 'Yes' : 'No',
		},
		{
			display: 'Concentration',
			getValue: spell => spell.concentration ? 'Yes' : 'No',
		},
		{
			key: 'spellHigherLevelDesc',
			display: 'At Higher Level',
			type: 'block',
			hideOnNullValue: true,
		},
	],
	filters: [
		{
			display: 'Description:',
			key: 'spellDesc', // Must be unique
			type: 'text',
		},
		{
			display: 'Material Component:',
			key: 'componentM',
			type: 'boolean',
			getFilter: value => value ? 'componentM:1' : 'componentM:0',
		},
		{
			display: 'Verbal Component:',
			key: 'componentV',
			type: 'boolean',
			getFilter: value => value ? 'componentV:1' : 'componentV:0',
		},
		{
			display: 'Somatic Component:',
			key: 'componentS',
			type: 'boolean',
			getFilter: value => value ? 'componentS:1' : 'componentS:0',
		},
		{
			display: 'Class:',
			key: 'klasses',
			type: 'dropdown',
			options: [
				'Bard',
				'Cleric',
				'Druid',
				'Paladin',
				'Ranger',
				'Sorcerer',
				'Warlock',
				'Wizard',
			],
		},
	],
	displayName: 'spellName',
	typeDisplayName: 'Spells',
	description: 'spellDesc',
	id: 'spellID',
	endpoint: '/api/search/spells',
	fields: 'schoolName,klasses,spellHigherLevelDesc,spellRange,duration,castingTime,spellDesc,componentV,componentM,componentS,spellMaterial,ritual,concentration',
};
