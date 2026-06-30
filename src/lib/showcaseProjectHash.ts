const PROJECT_HASH_PREFIX = 'project-'

export function showcaseProjectElementId(slug: string) {
  return `${PROJECT_HASH_PREFIX}${slug}`
}

export function showcaseProjectHash(slug: string) {
  return `#${showcaseProjectElementId(slug)}`
}

export function parseShowcaseProjectSlug(hash: string): string | null {
  const normalized = hash.startsWith('#') ? hash.slice(1) : hash
  if (!normalized.startsWith(PROJECT_HASH_PREFIX)) return null
  const slug = normalized.slice(PROJECT_HASH_PREFIX.length)
  return slug.length > 0 ? slug : null
}

export function syncShowcaseProjectHash(slug: string | null) {
  if (typeof window === 'undefined') return

  const nextHash = slug ? showcaseProjectHash(slug) : ''
  const nextUrl = `${window.location.pathname}${window.location.search}${nextHash}`
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`

  if (currentUrl === nextUrl) return

  window.history.replaceState(
    { showcase: { project: slug } },
    '',
    nextUrl,
  )
}

export function scrollToShowcaseProject(slug: string, behavior: ScrollBehavior = 'smooth') {
  const element = document.getElementById(showcaseProjectElementId(slug))
  if (!element) return false

  element.scrollIntoView({ behavior, block: 'center', inline: 'nearest' })
  return true
}
