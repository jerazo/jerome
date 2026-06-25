#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { GithubOidcStack } from '../lib/github-oidc-stack.js'

const app = new cdk.App()

new GithubOidcStack(app, 'JeromeGithubOidcStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION ?? 'us-east-1',
  },
  githubOrg: 'jerazo',
  githubRepo: 'jerome',
  githubBranch: 'main',
  githubEnvironment: 'jerome',
})
