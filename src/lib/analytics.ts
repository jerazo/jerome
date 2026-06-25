import mixpanel from 'mixpanel-browser'
import { buildInfo } from './buildInfo'

let initialized = false

function getToken() {
  return import.meta.env.VITE_MIXPANEL_TOKEN?.trim() ?? ''
}

export function isAnalyticsEnabled() {
  return initialized
}

export function initAnalytics() {
  const token = getToken()
  if (!token || initialized) return

  mixpanel.init(token, {
    debug: import.meta.env.DEV,
    track_pageview: false,
    persistence: 'localStorage',
  })

  mixpanel.register({
    app_name: buildInfo.name,
    app_version: buildInfo.version,
    build_commit: buildInfo.commit,
  })

  initialized = true
}

export function trackEvent(event: string, properties?: Record<string, unknown>) {
  if (!initialized) return
  mixpanel.track(event, properties)
}

export function trackPageView(path: string) {
  trackEvent('Page Viewed', { path })
}

export function trackSectionView(section: string) {
  trackEvent('Section Viewed', { section })
}
