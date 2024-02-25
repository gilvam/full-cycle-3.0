module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended'
	],
	overrides: [
		{
			env: {
				node: true,
				jest: true
			},
			files: ['.eslintrc.{js,cjs}', '**/*.spec.ts'],
			parserOptions: {
				sourceType: 'script'
			}
		}
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint', 'import'],
	rules: {
		'import/order': [
			'error',
			{
				groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
				'newlines-between': 'always',
				alphabetize: {
					order: 'asc',
					caseInsensitive: true
				}
			}
		],
		'import/prefer-default-export': 'off',
		'no-underscore-dangle': 'off',
		'lines-between-class-members': 'off',
		indent: ['error', 'tab'],
		'no-tabs': 'off'
	},
	settings: {
		'import/resolver': {
			typescript: {},
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx']
			}
		}
	}
};
