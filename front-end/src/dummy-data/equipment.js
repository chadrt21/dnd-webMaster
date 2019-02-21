export default [
	{
		index: 1,
		name: 'Club',
		equipment_category: 'Weapon',
		weapon_category: 'Simple',
		weapon_range: 'Melee',
		category_range: 'Simple Melee',
		cost: {
			quantity: 1,
			unit: 'sp',
		},
		damage: {
			dice_count: 1,
			dice_value: 4,
			damage_type: {
				url: 'http://www.dnd5eapi.co/api/damage-types/2',
				name: 'Bludgeoning',
			},
		},
		range: {
			normal: 5,
			long: null,
		},
		weight: 2,
		properties: [ {
			url: 'http://www.dnd5eapi.co/api/weapon-properties/4',
			name: 'Light',
		}, {
			url: 'http://www.dnd5eapi.co/api/weapon-properties/11',
			name: 'Monk',
		} ],
		url: 'http://www.dnd5eapi.co/api/equipment/1',
	}, {
		index: 2,
		name: 'Dagger',
		equipment_category: 'Weapon',
		weapon_category: 'Simple',
		weapon_range: 'Melee',
		category_range: 'Simple Melee',
		cost: {
			quantity: 2,
			unit: 'gp',
		},
		damage: {
			dice_count: 1,
			dice_value: 4,
			damage_type: {
				url: 'http://www.dnd5eapi.co/api/damage-types/8',
				name: 'Piercing',
			},
		},
		range: {
			normal: 5,
			long: null,
		},
		weight: 1,
		properties: [ {
			url: 'http://www.dnd5eapi.co/api/weapon-properties/2',
			name: 'Finesse',
		}, {
			url: 'http://www.dnd5eapi.co/api/weapon-properties/4',
			name: 'Light',
		}, {
			url: 'http://www.dnd5eapi.co/api/weapon-properties/8',
			name: 'Thrown',
		}, {
			url: 'http://www.dnd5eapi.co/api/weapon-properties/11',
			name: 'Monk',
		} ],
		throw_range: {
			normal: 20,
			long: 60,
		},
		url: 'http://www.dnd5eapi.co/api/equipment/2',
	}, {
		index: 3,
		name: 'Greatclub',
		equipment_category: 'Weapon',
		weapon_category: 'Simple',
		weapon_range: 'Melee',
		category_range: 'Simple Melee',
		cost: {
			quantity: 2,
			unit: 'sp',
		},
		damage: {
			dice_count: 1,
			dice_value: 8,
			damage_type: {
				url: 'http://www.dnd5eapi.co/api/damage-types/2',
				name: 'Bludgeoning',
			},
		},
		range: {
			normal: 5,
			long: null,
		},
		weight: 10,
		properties: [ {
			url: 'http://www.dnd5eapi.co/api/weapon-properties/9',
			name: 'Two-Handed',
		} ],
		url: 'http://www.dnd5eapi.co/api/equipment/3',
	}, {
		index: 4,
		name: 'Handaxe',
		equipment_category: 'Weapon',
		weapon_category: 'Simple',
		weapon_range: 'Melee',
		category_range: 'Simple Melee',
		cost: {
			quantity: 5,
			unit: 'gp',
		},
		damage: {
			dice_count: 1,
			dice_value: 6,
			damage_type: {
				url: 'http://www.dnd5eapi.co/api/damage-types/12',
				name: 'Slashing',
			},
		},
		range: {
			normal: 5,
			long: null,
		},
		weight: 2,
		properties: [ {
			url: 'http://www.dnd5eapi.co/api/weapon-properties/4',
			name: 'Light',
		}, {
			url: 'http://www.dnd5eapi.co/api/weapon-properties/8',
			name: 'Thrown',
		}, {
			url: 'http://www.dnd5eapi.co/api/weapon-properties/11',
			name: 'Monk',
		} ],
		throw_range: {
			normal: 20,
			long: 60,
		},
		url: 'http://www.dnd5eapi.co/api/equipment/4',
	}, {
		index: 5,
		name: 'Javelin',
		equipment_category: 'Weapon',
		weapon_category: 'Simple',
		weapon_range: 'Melee',
		category_range: 'Simple Melee',
		cost: {
			quantity: 5,
			unit: 'sp',
		},
		damage: {
			dice_count: 1,
			dice_value: 6,
			damage_type: {
				url: 'http://www.dnd5eapi.co/api/damage-types/8',
				name: 'Piercing',
			},
		},
		range: {
			normal: 5,
			long: null,
		},
		weight: 2,
		properties: [ {
			url: 'http://www.dnd5eapi.co/api/weapon-properties/8',
			name: 'Thrown',
		}, {
			url: 'http://www.dnd5eapi.co/api/weapon-properties/11',
			name: 'Monk',
		} ],
		throw_range: {
			normal: 30,
			long: 120,
		},
		url: 'http://www.dnd5eapi.co/api/equipment/5',
	}, {
		index: 6,
		name: 'Light hammer',
		equipment_category: 'Weapon',
		weapon_category: 'Simple',
		weapon_range: 'Melee',
		category_range: 'Simple Melee',
		cost: {
			quantity: 2,
			unit: 'gp',
		},
		damage: {
			dice_count: 1,
			dice_value: 4,
			damage_type: {
				url: 'http://www.dnd5eapi.co/api/damage-types/2',
				name: 'Bludgeoning',
			},
		},
		range: {
			normal: 5,
			long: null,
		},
		weight: 2,
		properties: [ {
			url: 'http://www.dnd5eapi.co/api/weapon-properties/4',
			name: 'Light',
		}, {
			url: 'http://www.dnd5eapi.co/api/weapon-properties/8',
			name: 'Thrown',
		}, {
			url: 'http://www.dnd5eapi.co/api/weapon-properties/11',
			name: 'Monk',
		} ],
		throw_range: {
			normal: 20,
			long: 60,
		},
		url: 'http://www.dnd5eapi.co/api/equipment/6',
	}, {
		index: 7,
		name: 'Mace',
		equipment_category: 'Weapon',
		weapon_category: 'Simple',
		weapon_range: 'Melee',
		category_range: 'Simple Melee',
		cost: {
			quantity: 5,
			unit: 'gp',
		},
		damage: {
			dice_count: 1,
			dice_value: 6,
			damage_type: {
				url: 'http://www.dnd5eapi.co/api/damage-types/2',
				name: 'Bludgeoning',
			},
		},
		range: {
			normal: 5,
			long: null,
		},
		weight: 4,
		properties: [ {
			url: 'http://www.dnd5eapi.co/api/weapon-properties/11',
			name: 'Monk',
		} ],
		url: 'http://www.dnd5eapi.co/api/equipment/7',
	}, {
		index: 8,
		name: 'Quarterstaff',
		equipment_category: 'Weapon',
		weapon_category: 'Simple',
		weapon_range: 'Melee',
		category_range: 'Simple Melee',
		cost: {
			quantity: 2,
			unit: 'sp',
		},
		damage: {
			dice_count: 1,
			dice_value: 6,
			damage_type: {
				url: 'http://www.dnd5eapi.co/api/damage-types/2',
				name: 'Bludgeoning',
			},
		},
		range: {
			normal: 5,
			long: null,
		},
		weight: 4,
		properties: [ {
			url: 'http://www.dnd5eapi.co/api/weapon-properties/10',
			name: 'Versatile',
		}, {
			url: 'http://www.dnd5eapi.co/api/weapon-properties/11',
			name: 'Monk',
		} ],
		url: 'http://www.dnd5eapi.co/api/equipment/8',
	},
];