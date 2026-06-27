import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { resolveStackOutputs } from './get-stack-outputs.mjs'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
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

const shortCacheFiles = ['index.html', 'sitemap.xml', 'robots.txt', 'version.json']

function run(command, args, env = process.env) {
  console.log(`> ${command} ${args.join(' ')}`)
  execFileSync(command, args, { cwd: rootDir, stdio: 'inherit', env })
}

if (!skipBuild) {
  run('npm', ['run', 'build'], {
    ...process.env,
    VITE_SITE_URL: process.env.VITE_SITE_URL ?? siteUrl ?? process.env.SITE_URL ?? '',
  })
}

run('aws', [
  's3',
  'sync',
  distDir,
  `s3://${bucket}`,
  '--delete',
  '--cache-control',
  'public,max-age=31536000,immutable',
  ...shortCacheFiles.flatMap((file) => ['--exclude', file]),
])

for (const file of shortCacheFiles) {
  const filePath = path.join(distDir, file)
  if (!existsSync(filePath)) continue

  run('aws', [
    's3',
    'cp',
    filePath,
    `s3://${bucket}/${file}`,
    '--cache-control',
    'public,max-age=0,must-revalidate',
  ])
}

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
