import { useEffect } from 'react'

export type ShowcaseDeepLinkState = {
  slide?: number
  project?: string | null
}

export function readShowcaseDeepLink(): ShowcaseDeepLinkState {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  const slideRaw = params.get('slide')
  const project = params.get('project')
  const slide = slideRaw != null ? Number.parseInt(slideRaw, 10) : undefined

  return {
    slide: Number.isFinite(slide) ? slide : undefined,
    project: project || undefined,
  }
}

function buildShowcaseUrl({ slide, project }: ShowcaseDeepLinkState) {
  const params = new URLSearchParams()
  if (slide != null && slide > 0) params.set('slide', String(slide))
  if (project) params.set('project', project)
  const query = params.toString()
  return query ? `/showcase?${query}` : '/showcase'
}

export function syncShowcaseDeepLink({ slide, project }: ShowcaseDeepLinkState) {
  const nextUrl = buildShowcaseUrl({ slide, project: project ?? undefined })
  const currentUrl = `${window.location.pathname}${window.location.search}`

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
