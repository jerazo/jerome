import type { StorybookConfig } from '@storybook/react-vite'
import { fileURLToPath, URL } from 'node:url'

const config: StorybookConfig = {
  stories: ['../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/react-vite',
  viteFinal: async (config) => {
    config.resolve ??= {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': fileURLToPath(new URL('../src', import.meta.url)),
      '@atomic': fileURLToPath(new URL('../src/components/atomic', import.meta.url)),
    }
    config.build ??= {}
    config.build.chunkSizeWarningLimit = 2000
    config.logLevel = 'error'
    return config
  },
}

export default config
