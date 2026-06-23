import { handleContactRequest, type ContactPayload } from '../server/contactHandler.ts'

type VercelRequest = {
  method?: string
  body?: ContactPayload
}

type VercelResponse = {
  setHeader: (name: string, value: string) => void
  status: (code: number) => VercelResponse
  json: (body: unknown) => void
  end: (body?: string) => void
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'application/json')

  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS')
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const result = await handleContactRequest(req.body ?? {}, {
    clickupApiToken: process.env.CLICKUP_API_TOKEN?.trim() ?? '',
    clickupListId: process.env.CLICKUP_LIST_ID?.trim() ?? '',
  })

  return res.status(result.status).json(result.body)
}
