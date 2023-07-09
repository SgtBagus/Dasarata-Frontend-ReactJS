module.exports = {
	"parser": "babel-eslint",
	"parserOptions": {
		"ecmaFeatures": {
			"legacyDecorators": true
		}
	},
	"extends": "airbnb",
	"plugins": [
		"react",
		"jsx-a11y",
		"import",
		"jest"
	],
	"rules": {
		"indent": 0,
		"react/jsx-indent": 0,
		"react/jsx-indent-props": 0,
		"jsx-a11y/anchor-is-valid": 0,
		"jsx-a11y/label-has-associated-control": 0,
		"jsx-a11y/label-has-for": 0,
		"react/jsx-filename-extension": 0,
		"max-len": 0,
		"no-underscore-dangle": 0,
		"one-var": 0,
		"prefer-promise-reject-errors": 0,
		"import/prefer-default-export": 0,
		"import/no-extraneous-dependencies": [
			"error",
			{"devDependencies": true}
		],
	},
	"env": {
		"browser": true,
		"node": true,
		"jest": true
	},
	"globals": {
		"_": false,
	}
}
