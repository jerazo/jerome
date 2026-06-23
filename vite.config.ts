import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { contactApiPlugin } from './server/contactApiPlugin.ts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      contactApiPlugin({
        clickupApiToken: env.CLICKUP_API_TOKEN ?? '',
        clickupListId: env.CLICKUP_LIST_ID ?? '',
      }),
    ],
  }
})
