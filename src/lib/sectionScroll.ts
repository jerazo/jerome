export function parseSectionIdFromHash(hash: string) {
  if (!hash.startsWith('#')) return null
  const id = decodeURIComponent(hash.slice(1))
  return id || null
}

export function scrollToSectionId(id: string, behavior: ScrollBehavior = 'smooth') {
  const el = document.getElementById(id)
  if (!el) return false

  const y = el.getBoundingClientRect().top + window.scrollY
  window.scrollTo({ top: y, behavior })
  return true
}
