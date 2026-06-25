import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initAnalytics, trackPageView, trackSectionView } from '../lib/analytics'
import { parseSectionIdFromHash } from '../lib/sectionScroll'

export function useAnalyticsPageView() {
  const location = useLocation()

  useEffect(() => {
    initAnalytics()

    const path = `${location.pathname}${location.search}`
    trackPageView(path)

    const section = parseSectionIdFromHash(location.hash)
    if (section) {
      trackSectionView(section)
    }
  }, [location.pathname, location.search, location.hash])
}
