export default {
	image: 'none',
	data: [
		{
			key: 'categoryName',
			display: 'Category',
			includeInPreview: true,
		},
		{
			key: 'subcategoryName',
			display: 'Subcategory',
			hideOnNullValue: true,
		},
		{
			key: 'equipmentWeight',
			display: 'Weight',
			includeInPreview: true,
			getValue: equipment => {
				if (!equipment.equipmentWeight) {
					return 'NA';
				}
				return `${equipment.equipmentWeight} lbs`;
			},
		},
		{
			display: 'Cost',
			getValue: equipment => {
				if (!equipment.costQuantity || !equipment.costUnit) {
					return 'NA';
				}
				return `${equipment.costQuantity} ${equipment.costUnit}`;
			},
			includeInPreview: true,
		},
		{
			display: 'Speed',
			hideOnNullValue: true,
			getValue: equipment => {
				if (!equipment.speedQuantity || !equipment.speedUnit) {
					return null;
				}
				return `${equipment.speedQuantity} ${equipment.speedUnit}`;
			},
		},
	],
	displayName: 'equipmentName',
	description: 'equipmentDesc',
	id: 'equipmentID',
	endpoint: '/api/search/equipment',
	fields: 'equipmentName,equipmentDesc,categoryName,subcategoryName,equipmentWeight,costQuantity,costUnit,speedQuantity,speedUnit',
};
