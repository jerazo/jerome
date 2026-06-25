#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { JeromeStack } from '../lib/jerome-stack.js'

const app = new cdk.App()

const clickupApiToken = process.env.CLICKUP_API_TOKEN?.trim() ?? ''
const clickupListId = process.env.CLICKUP_LIST_ID?.trim() ?? ''

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
})
