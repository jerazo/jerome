import { writeFileSync } from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'
import { getBuildInfo } from './lib/version.ts'

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
    writeBundle(options) {
      const outputDir = options.dir ?? 'dist'
      writeFileSync(
        path.join(outputDir, 'version.json'),
        `${JSON.stringify(buildInfo, null, 2)}\n`,
        'utf8',
      )
    },
  }
}
