/* eslint-disable no-console */
const schools = require('./5edatabase/5e-SRD-Magic-Schools.json');

module.exports = {
	'spell.componentV': row => {
		if (row.components && row.components.includes('V')) {
			return '1';
		} else {
			return '0';
		}
	},
	'spell.componentS': row => {
		if (row.components && row.components.includes('S')) {
			return '1';
		} else {
			return '0';
		}
	},
	'spell.componentM': row => {
		if (row.components && row.components.includes('M')) {
			return '1';
		} else {
			return '0';
		}
	},
	'spell.ritual': row => {
		if (row.ritual === 'yes') {
			return '1';
		} else {
			return '0';
		}
	},
	'spell.concentration': row => {
		if (row.ritual === 'yes') {
			return '1';
		} else {
			return '0';
		}
	},
	'spell.schoolID': row => {
		const school = schools.find(item => item.name === row.school.name);
		if (!school) {
			console.warn(`Could not find magic school for ${row.name}`);
			return `${school.index}`;
		}
		return `${school.index}`;
	},
	'feat.featLevel': row => {
		if (typeof row.level === 'number') {
			return row.level;
		} else {
			return 0;
		}
	},
	'spellklasslist.klassID': (row, deepRow) => {
		if (typeof deepRow.url === 'string') {
			const parts = /classes\/(\d+)/g.exec(deepRow.url);
			return parts[1];
		}
		return -1;
	},
	'skill.abilityScoreID': row => /ability-scores\/(\d+)/g.exec(row.ability_score.url)[1],
	'featklasslist.klassID': row => /classes\/(\d+)/g.exec(row.class.url)[1],
	'equipment.subcategoryName': row => (`'${`${
		row.armor_category ||
		row.gear_category ||
		row.weapon_category ||
		row.tool_category ||
		row.vehicle_category || ''
	}`.replace(/'/g, '\\\'')}'`),
	'equipment.costQuantity': row => {
		if (row.cost && row.cost.quantity) {
			return row.cost.quantity;
		} else {
			return 0;
		}
	},
	'equipment.costUnit': row => {
		if (row.cost && row.cost.unit) {
			return `'${row.cost.unit}'`;
		} else {
			return '``';
		}
	},
	'equipment.speedQuantity': row => {
		if (row.speed && row.speed.quantity) {
			return row.speed.quantity;
		} else {
			return 0;
		}
	},
	'equipment.speedUnit': row => {
		if (row.speed && row.speed.unit) {
			return `'${row.speed.unit}'`;
		} else {
			return '\'\'';
		}
	},
	'equipment.equipmentWeight': row => {
		if (row.weight) {
			return row.weight;
		} else {
			return 'NULL';
		}
	},
};
