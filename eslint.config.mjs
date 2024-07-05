import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPrettier from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config} */
export default [
    {
        plugins: {
            prettier: eslintPrettier,
        },
    },
    {
        files: ['**/*.{js,mjs,cjs,ts,json}'],
        rules: {
            ...eslintConfigPrettier.rules,
            'prettier/prettier': 'error',
        },
    },
    {
        languageOptions: {
            globals: globals.node,
        },
    },
    { ignores: ['node_modules', 'dist'] },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
];
