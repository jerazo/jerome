import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { resolveStackOutputs } from './get-stack-outputs.mjs'

const rootDir = path.join(fileURLToPath(import.meta.url), '..')
const skipBuild = process.argv.includes('--skip-build')

const outputs = resolveStackOutputs()

if (!outputs) {
  const stackName = process.env.AWS_STACK_NAME ?? 'JeromeStack'
  const region = process.env.AWS_REGION ?? process.env.AWS_DEFAULT_REGION ?? 'us-east-1'
  console.error(
    [
      'Could not resolve deployment targets.',
      `CloudFormation stack "${stackName}" was not found in ${region}.`,
      'Run the Deploy workflow with "Deploy CDK infrastructure" checked, or push infrastructure changes,',
      'or set SITE_BUCKET_NAME and CLOUDFRONT_DISTRIBUTION_ID in the jerome environment.',
    ].join('\n'),
  )
  process.exit(1)
}

const { bucket, distributionId, siteUrl } = outputs
const distDir = path.join(rootDir, 'dist')

function run(command, args) {
  console.log(`> ${command} ${args.join(' ')}`)
  execFileSync(command, args, { cwd: rootDir, stdio: 'inherit' })
}

if (!skipBuild) {
  run('npm', ['run', 'build'])
}

run('aws', ['s3', 'sync', distDir, `s3://${bucket}`, '--delete'])
run('aws', [
  'cloudfront',
  'create-invalidation',
  '--distribution-id',
  distributionId,
  '--paths',
  '/*',
])

if (siteUrl) {
  console.log(`\nDeployed to ${siteUrl}`)
}
