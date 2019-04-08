const fs = require('fs');
const path = require('path');

module.exports = {
	entry: path.resolve(__dirname, 'back-end/run-server.js'),

	output: {
		path: __dirname,
		filename: './server.bundle.js',
	},

	target: 'node',

	// keep node_module paths out of the bundle
	externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
		'react-dom/server',
	]).reduce(function (ext, mod) {
		ext[mod] = 'commonjs ' + mod;
		return ext;
	}, {}),

	node: {
		__filename: false,
		__dirname: false,
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: [ '@babel/preset-env', '@babel/preset-react' ],
					plugins: [
						'@babel/plugin-proposal-class-properties',
					],
				},
			},
		],
	},

};
