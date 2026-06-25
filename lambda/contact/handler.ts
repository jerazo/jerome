import type { APIGatewayProxyHandlerV2 } from 'aws-lambda'
import { handleContactRequest, type ContactPayload } from '../../server/contactHandler.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const method = event.requestContext.http.method

  if (method === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        ...corsHeaders,
        Allow: 'POST, OPTIONS',
      },
      body: '',
    }
  }

  if (method !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  let payload: ContactPayload = {}

  try {
    payload = JSON.parse(event.body ?? '{}') as ContactPayload
  } catch {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ error: 'Invalid request body.' }),
    }
  }

  const result = await handleContactRequest(payload, {
    clickupApiToken: process.env.CLICKUP_API_TOKEN?.trim() ?? '',
    clickupListId: process.env.CLICKUP_LIST_ID?.trim() ?? '',
  })

  return {
    statusCode: result.status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
    body: JSON.stringify(result.body),
  }
}
