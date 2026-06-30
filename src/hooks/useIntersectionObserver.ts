import { useEffect, useRef, useState } from 'react'

type IntersectionObserverOptions = {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  /** When IntersectionObserver is unavailable, treat the element as immediately visible. */
  fallbackInView?: boolean
}

const supportsIntersectionObserver =
  typeof window !== 'undefined' && typeof IntersectionObserver !== 'undefined'

export function useIntersectionObserver<T extends Element>(
  options: IntersectionObserverOptions = {},
) {
  const { threshold = 0.1, root = null, rootMargin, fallbackInView = true } = options
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(!supportsIntersectionObserver && fallbackInView)

  useEffect(() => {
    const node = ref.current
    if (!node || !supportsIntersectionObserver) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true)
      },
      { threshold, root, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [fallbackInView, root, rootMargin, threshold])

  return { ref, inView, supportsIntersectionObserver }
}
