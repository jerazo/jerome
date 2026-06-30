import { useEffect, useState } from 'react'
import { versionContent } from '../content/version'
import { buildInfo, formatVersionLabel, type VersionInfo } from '../lib/buildInfo'

const fallbackVersionInfo: VersionInfo = {
  version: buildInfo.version,
  commit: buildInfo.commit,
  timestamp: buildInfo.timestamp,
}

function isVersionInfo(value: unknown): value is VersionInfo {
  if (!value || typeof value !== 'object') return false

  const record = value as Record<string, unknown>
  return (
    typeof record.version === 'string' &&
    typeof record.commit === 'string' &&
    typeof record.timestamp === 'string'
  )
}

export function useVersionInfo() {
  const [info, setInfo] = useState<VersionInfo>(fallbackVersionInfo)

  useEffect(() => {
    let cancelled = false

    fetch('/version.json')
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data: unknown) => {
        if (!cancelled && isVersionInfo(data)) {
          setInfo(data)
        }
      })
      .catch(() => {
        // Keep compile-time fallback without logging.
      })

    return () => {
      cancelled = true
    }
  }, [])

  return {
    ...info,
    label: formatVersionLabel(info),
    releaseNotesUrl: versionContent.releaseNotesUrl,
  }
}
