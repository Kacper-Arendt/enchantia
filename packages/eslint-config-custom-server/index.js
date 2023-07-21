module.exports = {
	extends: ['eslint:recommended', 'turbo'],
	env: {
		node: true,
		es6: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	overrides: [
		{
			files: ['**/*.test.ts'],
			env: { 'jest/globals': true },
			plugins: ['jest'],
			extends: ['plugin:jest/recommended'],
		},
	],
};
