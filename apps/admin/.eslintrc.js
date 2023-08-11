module.exports = {
	extends: ['airbnb', 'airbnb-typescript', 'prettier'],
	plugins: ['prettier'],
	ignorePatterns: ['vite.config.ts'],
	env: {
		jest: true,
		node: true,
		browser: true,
		es2021: true,
	},
	parserOptions: {
		project: './tsconfig.json',
	},
	globals: {
		document: true,
		window: true,
	},
	rules: {
		// =========================
		// --> turn the rule off <--
		// =========================
		'react/react-in-jsx-scope': 0,
		'react/require-default-props': 0,
		'import/prefer-default-export': 0,
		'react/jsx-no-useless-fragment': 0,
		'no-param-reassign': 0,
		'react/no-danger': 0,
		'consistent-return': 0,
		// =====================================
		// --> turn the rule on as a warning <--
		// =====================================
		'react/jsx-filename-extension': [
			1,
			{
				extensions: ['.ts', '.tsx'],
			},
		],
		// ====================================
		// --> turn the rule on as an error <--
		// ====================================

		'react/function-component-definition': [
			2,
			{
				namedComponents: 'arrow-function',
			},
		],
		'prettier/prettier': [
			2,
			{
				endOfLine: 'auto',
			},
		],
		'react/no-unstable-nested-components': [
			2,
			{
				allowAsProps: true,
			},
		],
		'react/jsx-props-no-spreading': [
			2,
			{
				html: 'ignore',
				custom: 'ignore',
				explicitSpread: 'ignore',
				exceptions: [''],
			},
		],
	},
};
