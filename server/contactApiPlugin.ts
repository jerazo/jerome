import type { IncomingMessage } from 'node:http'
import type { Plugin, PreviewServer, ViteDevServer } from 'vite'
import { handleContactRequest, type ContactPayload } from './contactHandler.ts'

type ContactApiEnv = {
  clickupApiToken: string
  clickupListId: string
}

function readJsonBody(req: IncomingMessage): Promise<ContactPayload> {
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
        resolve(JSON.parse(data) as ContactPayload)
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
  return async (
    req: IncomingMessage,
    res: { statusCode: number; setHeader: (name: string, value: string) => void; end: (body?: string) => void },
    next: () => void,
  ) => {
    const pathname = req.url?.split('?')[0]
    if (pathname !== '/api/contact') {
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
      const result = await handleContactRequest(payload, env)
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
