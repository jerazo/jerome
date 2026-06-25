import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { parseSectionIdFromHash, scrollToSectionId } from '../lib/sectionScroll'
import { useReducedMotion } from './useReducedMotion'

const MAX_SCROLL_ATTEMPTS = 24

export function useSectionHashScroll() {
  const location = useLocation()
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const hash = location.hash || window.location.hash
    const id = parseSectionIdFromHash(hash)
    if (!id) return

    let cancelled = false
    const scrollBehavior: ScrollBehavior = reducedMotion ? 'auto' : 'smooth'

    const clearHash = () => {
      navigate({ pathname: location.pathname, search: location.search }, { replace: true })
    }

    const attemptScroll = (attemptsLeft: number) => {
      if (cancelled) return

      if (scrollToSectionId(id, scrollBehavior)) {
        clearHash()
        return
      }

      if (attemptsLeft > 0) {
        requestAnimationFrame(() => attemptScroll(attemptsLeft - 1))
        return
      }

      clearHash()
    }

    // Prevent the browser's default hash jump; we control scrolling instead.
    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'

    attemptScroll(MAX_SCROLL_ATTEMPTS)

    return () => {
      cancelled = true
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [location.hash, location.pathname, location.search, navigate, reducedMotion])
}
