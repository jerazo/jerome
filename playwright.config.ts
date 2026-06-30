import { defineConfig, devices } from '@playwright/test'

const port = Number(process.env.E2E_PORT ?? 5199)
const baseURL = process.env.E2E_BASE_URL ?? `http://127.0.0.1:${port}`

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['list']] : [['list']],
  timeout: 60_000,
  expect: { timeout: 15_000 },
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    ...devices['Desktop Chrome'],
  },
  webServer: process.env.E2E_SKIP_WEB_SERVER
    ? undefined
    : {
        command: `npm run preview -- --port ${port} --strictPort --host 127.0.0.1`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
})
