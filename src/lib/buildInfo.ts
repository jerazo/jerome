export type VersionInfo = {
  version: string
  commit: string
  timestamp: string
}

export type BuildInfo = VersionInfo & {
  name: string
}

declare const __BUILD_INFO__: BuildInfo

export const buildInfo: BuildInfo = __BUILD_INFO__

export function formatVersionLabel(info: Pick<VersionInfo, 'version' | 'commit'>) {
  const parts = [`v${info.version}`]

  if (info.commit && info.commit !== 'local') {
    parts.push(info.commit)
  }

  return parts.join(' · ')
}

/** @deprecated Use formatVersionLabel with runtime version info instead. */
export function formatBuildLabel() {
  return formatVersionLabel(buildInfo)
}
