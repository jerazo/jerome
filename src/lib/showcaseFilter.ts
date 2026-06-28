import type { ShowcaseItem } from '../content/showcase'

const STORAGE_KEY = 'jerome-showcase-filter'
export const SHOWCASE_FILTER_ALL = 'all'

export function loadShowcaseFilter(): string {
  if (typeof window === 'undefined') return SHOWCASE_FILTER_ALL
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY)
    return stored ?? SHOWCASE_FILTER_ALL
  } catch {
    return SHOWCASE_FILTER_ALL
  }
}

export function persistShowcaseFilter(value: string) {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.setItem(STORAGE_KEY, value)
  } catch {
    // ignore quota errors
  }
}

export function getShowcaseTechCategories(items: ShowcaseItem[]): string[] {
  const categories = new Set<string>()
  for (const item of items) {
    for (const tech of item.techStack) {
      categories.add(tech)
    }
  }
  return Array.from(categories).sort((a, b) => a.localeCompare(b))
}

export function filterShowcaseItems(items: ShowcaseItem[], category: string): ShowcaseItem[] {
  if (category === SHOWCASE_FILTER_ALL) return items
  return items.filter((item) => item.techStack.includes(category))
}
