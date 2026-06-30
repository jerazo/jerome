import { useEffect } from 'react'
import { parseShowcaseProjectSlug } from '../lib/showcaseProjectHash'

export type ShowcaseDeepLinkState = {
  slide?: number
  project?: string | null
}

export function readShowcaseDeepLink(): ShowcaseDeepLinkState {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  const slideRaw = params.get('slide')
  const slide = slideRaw != null ? Number.parseInt(slideRaw, 10) : undefined
  const hashProject = parseShowcaseProjectSlug(window.location.hash)
  const legacyProject = params.get('project')

  return {
    slide: Number.isFinite(slide) ? slide : undefined,
    project: hashProject ?? legacyProject ?? undefined,
  }
}

function buildShowcaseUrl({ slide, project }: ShowcaseDeepLinkState) {
  const params = new URLSearchParams()
  if (slide != null && slide > 0) params.set('slide', String(slide))
  const query = params.toString()
  const hash = project ? `#project-${project}` : ''
  return `${query ? `/showcase?${query}` : '/showcase'}${hash}`
}

export function syncShowcaseDeepLink({ slide, project }: ShowcaseDeepLinkState) {
  const nextUrl = buildShowcaseUrl({ slide, project: project ?? undefined })
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`

  if (currentUrl === nextUrl) return

  window.history.replaceState({ showcase: { slide, project } }, '', nextUrl)
}

export function useShowcaseDeepLink({
  onPopState,
}: {
  onPopState?: (state: ShowcaseDeepLinkState) => void
}) {
  useEffect(() => {
    const onPop = () => {
      onPopState?.(readShowcaseDeepLink())
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [onPopState])
}
