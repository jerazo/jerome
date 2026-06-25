import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { resolveStackOutputs } from './get-stack-outputs.mjs'

const rootDir = path.join(fileURLToPath(import.meta.url), '..')
const skipBuild = process.argv.includes('--skip-build')

const outputs = resolveStackOutputs()

if (!outputs) {
  console.error(
    'Could not resolve deployment targets. Provide cdk-outputs.json, SITE_BUCKET_NAME + CLOUDFRONT_DISTRIBUTION_ID, or a deployed JeromeStack in CloudFormation.',
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
