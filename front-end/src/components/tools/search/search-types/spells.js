export default {
	image: 'none',
	data: [
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
	displayName: 'spellName',
	description: 'spellDesc',
	id: 'spellID',
	endpoint: '/api/search/spells',
	fields: 'spellHigherLevelDesc,spellRange,duration,castingTime,spellDesc,componentV,componentM,componentS,spellMaterial,ritual,concentration',
};
