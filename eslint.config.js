// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook'

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import atomicStructure from 'eslint-plugin-atomic-structure'

export default defineConfig([
  globalIgnores([
    'dist',
    'storybook-static',
    '.venv/**',
    '.codex/**',
    'design-system/**',
    'infrastructure/cdk.out/**',
    'playwright-report/**',
    'test-results/**',
  ]),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
    plugins: {
      'atomic-structure': atomicStructure,
    },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'react-refresh/only-export-components': ['error', { allowConstantExport: true }],
      'atomic-structure/atomic-component-path': [
        'error',
        { configPath: 'src/config/atomic-structure.json' },
      ],
    },
  },
  {
    files: ['e2e/**/*.{ts,tsx}', 'playwright.config.ts'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: [
      'server/**/*.{ts,tsx}',
      'lambda/**/*.{ts,tsx}',
      'scripts/**/*.{ts,tsx}',
      'api/**/*.{ts,tsx}',
      'vite.config.ts',
      'infrastructure/**/*.{ts,tsx}',
    ],
    languageOptions: {
      globals: globals.node,
    },
  },
  ...storybook.configs['flat/recommended'],
])
