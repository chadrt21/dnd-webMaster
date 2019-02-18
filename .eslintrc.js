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
		"comma-style": [
			"error",
			"last"
		],
		"comma-dangle": [
			"error",
			"always-multiline"
		],
		"no-lonely-if": "error",
		"arrow-body-style": [
			"error",
			"as-needed"
		],
		"prefer-const": "error",
		"array-bracket-spacing": [
			"error",
			"always"
		],
		"block-spacing": [
			"error",
			"always"
		],
		"func-call-spacing": [
			"error",
			"never"
		],
		"key-spacing": [
			"error",
			{
				"beforeColon": false,
				"afterColon": true,
				"mode": "strict"
			}
		],
		"object-curly-spacing": [
			"error",
			"always"
		],
		"react/no-deprecated": 0,
		"arrow-spacing": [
			"error",
			{
				"before": true,
				"after": true,
			}
		],
		"no-var": "error",
		"new-parens": "error",
		"object-shorthand": [
			"error",
			"properties"
		],
		"react/display-name": 0,
    }
};