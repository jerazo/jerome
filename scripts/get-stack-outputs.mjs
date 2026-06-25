import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.join(fileURLToPath(import.meta.url), '..')

export function readCdkOutputs(outputsPath = path.join(rootDir, 'cdk-outputs.json')) {
  if (!existsSync(outputsPath)) {
    return null
  }

  const outputs = JSON.parse(readFileSync(outputsPath, 'utf8'))
  const stackOutputs = outputs.JeromeStack

  if (!stackOutputs?.SiteBucketName || !stackOutputs?.DistributionId) {
    return null
  }

  return {
    bucket: stackOutputs.SiteBucketName,
    distributionId: stackOutputs.DistributionId,
    siteUrl: stackOutputs.SiteUrl,
  }
}

export function readEnvOutputs() {
  const bucket = process.env.SITE_BUCKET_NAME?.trim()
  const distributionId = process.env.CLOUDFRONT_DISTRIBUTION_ID?.trim()

  if (!bucket || !distributionId) {
    return null
  }

  return {
    bucket,
    distributionId,
    siteUrl: process.env.SITE_URL?.trim(),
  }
}

function readCloudFormationOutput(stackName, outputKey) {
  return execFileSync(
    'aws',
    [
      'cloudformation',
      'describe-stacks',
      '--stack-name',
      stackName,
      '--query',
      `Stacks[0].Outputs[?OutputKey=='${outputKey}'].OutputValue | [0]`,
      '--output',
      'text',
    ],
    { encoding: 'utf8' },
  ).trim()
}

export function readCloudFormationOutputs(stackName = process.env.AWS_STACK_NAME ?? 'JeromeStack') {
  try {
    const bucket = readCloudFormationOutput(stackName, 'SiteBucketName')
    const distributionId = readCloudFormationOutput(stackName, 'DistributionId')
    const siteUrl = readCloudFormationOutput(stackName, 'SiteUrl')

    if (!bucket || bucket === 'None' || !distributionId || distributionId === 'None') {
      return null
    }

    return {
      bucket,
      distributionId,
      siteUrl: siteUrl === 'None' ? undefined : siteUrl,
    }
  } catch {
    return null
  }
}

export function resolveStackOutputs() {
  return readEnvOutputs() ?? readCdkOutputs() ?? readCloudFormationOutputs()
}
