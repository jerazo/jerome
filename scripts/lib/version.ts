import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const rootDir = process.cwd()

function readPackageVersion() {
  const packageJson = JSON.parse(readFileSync(path.join(rootDir, 'package.json'), 'utf8')) as {
    version?: string
  }
  return String(packageJson.version ?? '0.0.0')
}

function readGitCommit() {
  if (process.env.GITHUB_SHA) {
    return process.env.GITHUB_SHA.slice(0, 7)
  }

  try {
    return execFileSync('git', ['rev-parse', '--short', 'HEAD'], {
      cwd: rootDir,
      encoding: 'utf8',
    }).trim()
  } catch {
    return 'local'
  }
}

export function getBuildInfo() {
  return {
    name: 'jerome',
    version: readPackageVersion(),
    commit: readGitCommit(),
    builtAt: new Date().toISOString(),
  }
}

if (import.meta.url === pathToFileURL(path.resolve(process.argv[1] ?? '')).href) {
  console.log(JSON.stringify(getBuildInfo(), null, 2))
}
