module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
	},
    "extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
	},
	"parser": "babel-eslint",
    "plugins": [
        "react"
	],
	"globals": {
		"React": true
	},
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
		],
		"react/no-deprecated": 0,
    }
};