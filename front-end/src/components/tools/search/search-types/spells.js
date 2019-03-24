export default {
	image: 'none',
	subHeadings: [
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
	],
	displayName: 'spellName',
	description: 'spellDesc',
	id: 'spellID',
	fields: 'spellRange,duration,castingTime,spellDesc,componentV,componentM,componentS',
};
