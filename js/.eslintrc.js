module.exports = {
	env: {
		browser: true,
		es2020: true,
		node: true,
	},
	extends: ["eslint:recommended", "plugin:unicorn/recommended"],
	parserOptions: {
		ecmaVersion: 11,
		sourceType: "module",
	},
	globals: {
		d3: true,
		_ti_update: true,
	},
	rules: {
		"unicorn/filename-case": "off",
		"unicorn/no-fn-reference-in-iterator": "off",
	},
};