import { Link } from 'react-router-dom'
import { useVersionInfo } from '../../hooks/useVersionInfo'
import { cn } from '../../lib/cn'

type BuildVersionLabelProps = {
  className?: string
}

export function BuildVersionLabel({ className }: BuildVersionLabelProps) {
  const { label, timestamp, releaseNotesUrl } = useVersionInfo()

  const versionClassName = cn('font-mono text-sand/80', className)

  if (releaseNotesUrl) {
    const isExternal = releaseNotesUrl.startsWith('http')

    if (isExternal) {
      return (
        <a
          href={releaseNotesUrl}
          className={cn(versionClassName, 'transition hover:text-sand focus-visible:focus-ring')}
          title={timestamp}
        >
          {label}
        </a>
      )
    }

    return (
      <Link
        to={releaseNotesUrl}
        className={cn(versionClassName, 'transition hover:text-sand focus-visible:focus-ring')}
        title={timestamp}
      >
        {label}
      </Link>
    )
  }

  return (
    <span className={versionClassName} title={timestamp}>
      {label}
    </span>
  )
}
