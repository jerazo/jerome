import type { APIGatewayProxyHandlerV2 } from 'aws-lambda'
import {
  handleContactAccessOtpRequest,
  handleContactAccessOtpVerify,
} from '../../server/contactAccessHandler.ts'
import { handleContactRequest, type ContactPayload } from '../../server/contactHandler.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

function contactAccessConfig() {
  return {
    notifyEmail: process.env.NOTIFY_EMAIL?.trim() ?? '',
    sesFromEmail: process.env.SES_FROM_EMAIL?.trim() ?? '',
    clickupApiToken: process.env.CLICKUP_API_TOKEN?.trim() ?? '',
    clickupListId: process.env.CLICKUP_LIST_ID?.trim() ?? '',
    otpSecret: process.env.CONTACT_ACCESS_OTP_SECRET?.trim() || 'jerome-contact-access-dev-secret',
  }
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const method = event.requestContext.http.method
  const path = event.rawPath ?? event.requestContext.http.path

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

  let payload: Record<string, unknown>

  try {
    payload = JSON.parse(event.body ?? '{}') as Record<string, unknown>
  } catch {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ error: 'Invalid request body.' }),
    }
  }

  const config = contactAccessConfig()

  if (path === '/api/contact-access/request') {
    const result = await handleContactAccessOtpRequest(payload, config)
    return {
      statusCode: result.status,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify(result.body),
    }
  }

  if (path === '/api/contact-access/verify') {
    const result = await handleContactAccessOtpVerify(payload, config)
    return {
      statusCode: result.status,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify(result.body),
    }
  }

  const result = await handleContactRequest(payload as ContactPayload, {
    clickupApiToken: config.clickupApiToken,
    clickupListId: config.clickupListId,
  })

  return {
    statusCode: result.status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
    body: JSON.stringify(result.body),
  }
}
