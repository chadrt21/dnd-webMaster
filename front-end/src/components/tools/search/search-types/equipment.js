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
	typeDisplayName: 'Equipment',
	id: 'equipmentID',
	endpoint: '/api/search/equipment',
	filters: [
		{
			display: 'Category',
			key: 'categoryName',
			type: 'dropdown',
			options: [
				'Weapon',
				'Armor',
				'Adventuring Gear',
				'Tools',
				'Mounts and Vehicles',
			],
		},
		{
			display: 'Subcategory',
			key: 'subCategoryName',
			type: 'dropdown',
			options: [
				'Light',
				'Medium',
				'Heavy',
				'Shield',
				'Standard Gear',
				'Ammunition',
				'Holy Symbol',
				'Arcane focus',
				'Druidic focus',
				'Kit',
				'Equipment Pack',
				'Artisan\'s Tools',
				'Gaming Sets',
				'Musical Instrument',
				'Other Tools',
				'Mounts and Other Animals',
				'Tack, Harness, and Drawn Vehicles',
				'Waterborne Vehicles',
			],
		},
	],
	fields: 'equipmentDesc,categoryName,subcategoryName,equipmentWeight,costQuantity,costUnit,speedQuantity,speedUnit',
};
