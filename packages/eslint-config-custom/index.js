module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'prettier'],
	env: {
		jest: true,
		node: true,
		browser: true,
		es2021: true,
	},
	globals: {
		document: true,
		window: true,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			extends: [
				'plugin:@typescript-eslint/eslint-recommended',
				'plugin:@typescript-eslint/recommended',
				'next',
				'turbo',
				'prettier',
				'plugin:react/recommended',
			],
			parserOptions: {
				parser: '@typescript-eslint/parser',
				project: 'tsconfig.json',
				sourceType: 'module',
			},
			rules: {
				'react/react-in-jsx-scope': 0,
			},
		},
	],
};
