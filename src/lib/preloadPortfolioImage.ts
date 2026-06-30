const preloaded = new Set<string>()

export function preloadPortfolioImage(src: string): Promise<void> {
  if (preloaded.has(src)) return Promise.resolve()

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.loading = 'eager'
    img.decoding = 'async'
    img.onload = () => {
      preloaded.add(src)
      resolve()
    }
    img.onerror = () => reject(new Error(`Failed to preload image: ${src}`))
    img.src = src
  })
}

export async function preloadPortfolioImages(sources: string[]) {
  await Promise.allSettled(sources.map((src) => preloadPortfolioImage(src)))
}
