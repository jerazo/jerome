export type BuildInfo = {
  name: string
  version: string
  commit: string
  builtAt: string
}

declare const __BUILD_INFO__: BuildInfo

export const buildInfo: BuildInfo = __BUILD_INFO__

export function formatBuildLabel() {
  const parts = [`v${buildInfo.version}`]

  if (buildInfo.commit && buildInfo.commit !== 'local') {
    parts.push(buildInfo.commit)
  }

  return parts.join(' · ')
}
