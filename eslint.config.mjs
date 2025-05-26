import { defineConfig } from 'eslint/config';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import pluginImport from 'eslint-plugin-import';
import pluginPrettier from 'eslint-plugin-prettier';

export default defineConfig({
    ignores: [
        'node_modules/**',
        'dist/**',
        'build/**',
        'coverage/**',
        'public/**',
    ],
    languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: {
            ...globals.browser,
            ...globals.jest,
        },
        parserOptions: {
            ecmaFeatures: { jsx: true },
        },
    },
    plugins: {
        react: pluginReact,
        import: pluginImport,
        prettier: pluginPrettier,
    },
    rules: {
        ...pluginReact.configs.recommended.rules,
        ...pluginImport.configs.recommended.rules,
        'react/react-in-jsx-scope': 'off',

        'no-console': 'off',
        'no-undef': 'error',
        'react/prop-types': 'off',
        'prettier/prettier': 'error',
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            alias: {
                map: [['components', './src/components']], // components → src/components
                extensions: ['.js', '.jsx'],
            },
        },
    },
});
