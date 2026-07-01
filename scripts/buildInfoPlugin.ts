import { writeFileSync } from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'
import { getBuildInfo, getVersionInfo } from './lib/version.ts'

export function buildInfoPlugin(): Plugin {
  const buildInfo = getBuildInfo()

  return {
    name: 'build-info',
    config() {
      return {
        define: {
          __BUILD_INFO__: JSON.stringify(buildInfo),
        },
      }
    },
    configureServer(server) {
      server.middlewares.use('/version.json', (_req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(`${JSON.stringify(getVersionInfo(), null, 2)}\n`)
      })
    },
    writeBundle(options) {
      const outputDir = options.dir ?? 'dist'
      writeFileSync(
        path.join(outputDir, 'version.json'),
        `${JSON.stringify(getVersionInfo(), null, 2)}\n`,
        'utf8',
      )
    },
  }
}
