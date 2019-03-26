export default {
	image: 'none',
	data: [
		{
			key: 'featLevel',
			display: 'Level',
			includeInPreview: true,
		},
		{
			key: 'klassName',
			display: 'Class',
			includeInPreview: true,
		},
	],
	displayName: 'featName',
	description: 'featDesc',
	typeDisplayName: 'Class Features',
	id: 'featID',
	endpoint: '/api/search/feats',
	fields: 'featLevel,klassName,featDesc',
};
