const data = require('./data');
const generateScript = require('./generateScript');

const [
	,
	,
	tablesString,
] = process.argv;

let tables;
if (tablesString) {
	tables = tablesString.split(/\s*,\s*/);
}

data.forEach(
	item => {
		if (!tables || tables.includes(item.table)) {
			generateScript(item.table, item.file, item.columns, item.pattern, item.deepField);
		}
	}
);
