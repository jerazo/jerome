import type { IncomingMessage } from 'node:http'
import type { Plugin, PreviewServer, ViteDevServer } from 'vite'
import {
  handleContactAccessOtpRequest,
  handleContactAccessOtpVerify,
} from './contactAccessHandler.ts'
import { handleContactRequest, type ContactPayload } from './contactHandler.ts'

type ContactApiEnv = {
  clickupApiToken: string
  clickupListId: string
  notifyEmail: string
  sesFromEmail: string
  contactAccessOtpSecret: string
}

function readJsonBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    let data = ''

    req.on('data', (chunk) => {
      data += chunk
    })

    req.on('end', () => {
      if (!data) {
        resolve({})
        return
      }

      try {
        resolve(JSON.parse(data) as Record<string, unknown>)
      } catch {
        reject(new Error('Invalid JSON body'))
      }
    })

    req.on('error', reject)
  })
}

function sendJson(
  res: { statusCode: number; setHeader: (name: string, value: string) => void; end: (body?: string) => void },
  status: number,
  body: Record<string, unknown>,
) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

function createContactMiddleware(env: ContactApiEnv) {
  const contactAccessConfig = {
    clickupApiToken: env.clickupApiToken,
    clickupListId: env.clickupListId,
    notifyEmail: env.notifyEmail,
    sesFromEmail: env.sesFromEmail,
    otpSecret: env.contactAccessOtpSecret,
  }

  return async (
    req: IncomingMessage,
    res: { statusCode: number; setHeader: (name: string, value: string) => void; end: (body?: string) => void },
    next: () => void,
  ) => {
    const pathname = req.url?.split('?')[0]

    if (
      pathname !== '/api/contact' &&
      pathname !== '/api/contact-access/request' &&
      pathname !== '/api/contact-access/verify'
    ) {
      next()
      return
    }

    if (req.method === 'OPTIONS') {
      res.statusCode = 204
      res.setHeader('Allow', 'POST, OPTIONS')
      res.end()
      return
    }

    if (req.method !== 'POST') {
      sendJson(res, 405, { error: 'Method not allowed' })
      return
    }

    try {
      const payload = await readJsonBody(req)

      if (pathname === '/api/contact-access/request') {
        const result = await handleContactAccessOtpRequest(payload, contactAccessConfig)
        sendJson(res, result.status, result.body)
        return
      }

      if (pathname === '/api/contact-access/verify') {
        const result = await handleContactAccessOtpVerify(payload, contactAccessConfig)
        sendJson(res, result.status, result.body)
        return
      }

      const result = await handleContactRequest(payload as ContactPayload, env)
      sendJson(res, result.status, result.body)
    } catch {
      sendJson(res, 400, { error: 'Invalid request body.' })
    }
  }
}

function attachContactApi(server: ViteDevServer | PreviewServer, env: ContactApiEnv) {
  server.middlewares.use(createContactMiddleware(env))
}

export function contactApiPlugin(env: ContactApiEnv): Plugin {
  return {
    name: 'contact-api',
    configureServer(server) {
      attachContactApi(server, env)
    },
    configurePreviewServer(server) {
      attachContactApi(server, env)
    },
  }
}
