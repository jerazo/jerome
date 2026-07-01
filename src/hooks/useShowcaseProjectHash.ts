import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  parseShowcaseProjectSlug,
  scrollToShowcaseProject,
} from '../lib/showcaseProjectHash'
import { useReducedMotion } from './useReducedMotion'

const MAX_SCROLL_ATTEMPTS = 24

export function useShowcaseProjectHash({
  onProjectSlug,
}: {
  onProjectSlug?: (slug: string | null) => void
}) {
  const location = useLocation()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (location.pathname !== '/showcase') return

    const slug = parseShowcaseProjectSlug(location.hash)
    onProjectSlug?.(slug)

    if (!slug) return

    let cancelled = false
    const behavior: ScrollBehavior = reducedMotion ? 'auto' : 'smooth'

    const attemptScroll = (attemptsLeft: number) => {
      if (cancelled) return

      if (scrollToShowcaseProject(slug, behavior)) return

      if (attemptsLeft > 0) {
        requestAnimationFrame(() => attemptScroll(attemptsLeft - 1))
      }
    }

    attemptScroll(MAX_SCROLL_ATTEMPTS)

    return () => {
      cancelled = true
    }
  }, [location.hash, location.pathname, onProjectSlug, reducedMotion])
}
