import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { buildInfoPlugin } from './scripts/buildInfoPlugin.ts'
import { seoPlugin } from './scripts/seoPlugin.ts'
import { contactApiPlugin } from './server/contactApiPlugin.ts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      seoPlugin(),
      buildInfoPlugin(),
      contactApiPlugin({
        clickupApiToken: env.CLICKUP_API_TOKEN ?? '',
        clickupListId: env.CLICKUP_LIST_ID ?? '',
        notifyEmail: env.NOTIFY_EMAIL ?? 'jerome.erazo@gmail.com',
        sesFromEmail: env.SES_FROM_EMAIL ?? env.NOTIFY_EMAIL ?? 'jerome.erazo@gmail.com',
        contactAccessOtpSecret:
          env.CONTACT_ACCESS_OTP_SECRET ?? 'jerome-contact-access-dev-secret',
      }),
    ],
  }
})
