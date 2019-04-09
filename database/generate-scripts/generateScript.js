/* eslint-disable no-useless-escape */
/* eslint-disable no-console */
const reducers = require('./reducers');
const fs = require('fs');

const loadFile = file => require(`./5edatabase/${file}`);

const warnedColumns = [];

const escape = (value, table, column, row, deepRow) => {
	if (reducers[`${table}.${column}`]) {
		return reducers[`${table}.${column}`](row, deepRow);
	}

	switch (typeof value) {
	case 'string':
		return `'${value.replace(/'/g, '\\\'')}'`;
	case 'function':
		return 'NULL';
	case 'object':
		if (Array.isArray(value)) {
			return `'${value.join(',').replace(/'/g, '\\\'')}'`;
		}
		else if (value === null) {
			return 'NULL';
		}
		return `'${JSON.stringify(value).replace(/'/g, '\\\'')}'`;
	case 'boolean':
		return `${value ? 1 : 0}`;
	case 'undefined':
		if (!warnedColumns.includes(column)) {
			console.warn(`${column} is undefined for ${table}`);
			warnedColumns.push(column);
		}
		return '\'\'';
	default:
		return `${value}`;
	}
};

const addValuesToInsertStatement = (pattern, table, columns, deepFieldName) => (statement, row, index, arr) => {
	const parts = /\(?([^\)]+)\)?/gi.exec(pattern)[1].split(/\s*,\s*/);
	const colParts = /\(?([^\)]+)\)?/gi.exec(columns)[1].split(/\s*,\s*/);
	const values = parts.map(
		key => row[key]
	);

	if (deepFieldName && !Array.isArray(row[deepFieldName])) {
		return statement;
	} else if (deepFieldName) {
		for (let j = 0; j < row[deepFieldName].length; j++) {
			statement += '(';
			for (let colPart = 0; colPart < colParts.length; colPart++) {
				if (index === 2) {
					console.log(`At spell ${row.name}: ${row[deepFieldName][j].name}`);
					console.log('colPart', colPart);
					console.log(colParts[colPart], '\n');
				}
				statement += escape(values[colPart], table, colParts[colPart], row, row[deepFieldName][j]);
				if (colPart < colParts.length - 1) {
					statement += ',';
				}
			}
			statement += ')';
			if (index < arr.length - 1 || j < row[deepFieldName].length - 1) {
				statement += ',';
			}
			statement += '\n';
		}
		return statement;
	}

	statement += '(';
	for (let i = 0; i < values.length; i++) {
		statement += escape(values[i], table, colParts[i], row);
		if (i < values.length - 1) {
			statement += ', ';
		}
	}
	statement += ')';
	if (index < arr.length - 1) {
		statement += ',';
	}
	statement += '\n';
	return statement;
};

module.exports = (table, file, columns, pattern, deepFieldName) => {
	const data = loadFile(file);
	let statement = 
`INSERT INTO ${table}
${columns}
VALUES
`;

	statement = data.reduce(addValuesToInsertStatement(pattern, table, columns, deepFieldName), statement);

	fs.writeFile(
		`./output/insert-${table}.sql`,
		statement,
		err => {
			if (err) {
				console.log('There was an error writing the script');
				console.log(err);
			}
			console.log(`The script was generated at ./output/insert-${table}.sql`);
		}
	);
};
