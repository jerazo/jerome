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
    const atomicBarrel = fileURLToPath(new URL('../src/components/atomic/index.ts', import.meta.url))
    const srcDir = fileURLToPath(new URL('../src', import.meta.url))
    const atomicDir = fileURLToPath(new URL('../src/components/atomic', import.meta.url))

    config.resolve.alias = {
      ...(Array.isArray(config.resolve.alias) ? {} : config.resolve.alias),
      '@/components/atomic': atomicBarrel,
      '@': srcDir,
      '@atomic': atomicDir,
    }
    config.build ??= {}
    config.build.chunkSizeWarningLimit = 2000
    config.build.rollupOptions = {
      ...config.build.rollupOptions,
      checks: {
        ...config.build.rollupOptions?.checks,
        pluginTimings: false,
      },
    }
    config.logLevel = 'error'
    return config
  },
}

export default config
