// Declare the order in which SQL files are to be bundled
const order = [
	'loadMaster.sql',
	'generate-scripts/output/insert-abilityscore.sql',
	'generate-scripts/output/insert-damagetype.sql',
	'generate-scripts/output/insert-equipment.sql',
	'generate-scripts/output/insert-feat.sql',
	'generate-scripts/output/insert-klass.sql',
	'generate-scripts/output/insert-featklasslist.sql',
	'generate-scripts/output/insert-proficiency.sql',
	'generate-scripts/output/insert-race.sql',
	'generate-scripts/output/insert-spellschool.sql',
	'generate-scripts/output/insert-skill.sql',
	'generate-scripts/output/insert-spell.sql',
	'generate-scripts/output/insert-spellklasslist.sql',
	'generate-scripts/output/insert-weaponproperty.sql',
];

const fs = require('fs');
const path = require('path');
let resultContents = '';

order.forEach((filePath, index) => {
	const fileContents = fs.readFileSync(path.resolve(`${__dirname}/${filePath}`));
	resultContents += `${fileContents}${index === 0 ? '' : ';'}\n\n`;
});

fs.writeFileSync('./bundle.sql', resultContents);
