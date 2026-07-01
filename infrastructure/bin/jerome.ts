#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { JeromeStack } from '../lib/jerome-stack.js'

const app = new cdk.App()

function parseDomainNames(raw: string | undefined): string[] | undefined {
  const names = raw?.split(',').map((name) => name.trim()).filter(Boolean) ?? []
  return names.length > 0 ? names : undefined
}

const clickupApiToken = process.env.CLICKUP_API_TOKEN?.trim() ?? ''
const clickupListId = process.env.CLICKUP_LIST_ID?.trim() ?? ''
const notifyEmail = process.env.NOTIFY_EMAIL?.trim() ?? 'jerome.erazo@gmail.com'
const sesFromEmail = process.env.SES_FROM_EMAIL?.trim() ?? notifyEmail
const contactAccessOtpSecret = process.env.CONTACT_ACCESS_OTP_SECRET?.trim() ?? ''
const siteDomainNames = parseDomainNames(process.env.SITE_DOMAIN_NAMES)
const certificateArn = process.env.ACM_CERTIFICATE_ARN?.trim() || undefined
const siteUrl = process.env.SITE_URL?.trim() || undefined

if (!clickupApiToken || !clickupListId) {
  console.warn(
    'Warning: CLICKUP_API_TOKEN and CLICKUP_LIST_ID are not set. The contact Lambda will fail until you redeploy with them.',
  )
}

new JeromeStack(app, 'JeromeStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION ?? 'us-east-1',
  },
  clickupApiToken,
  clickupListId,
  notifyEmail,
  sesFromEmail,
  contactAccessOtpSecret: contactAccessOtpSecret || undefined,
  siteDomainNames,
  certificateArn,
  siteUrl,
})
