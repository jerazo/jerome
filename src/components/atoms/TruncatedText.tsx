import { useEffect, useRef, useState } from 'react'
import type { ITruncatedTextProps } from '../atomic/types'
import { cn } from '../../lib/cn'

export function TruncatedText({ text, className, ...props }: ITruncatedTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [isTruncated, setIsTruncated] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const update = () => {
      setIsTruncated(node.scrollWidth > node.clientWidth)
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(node)
    window.addEventListener('resize', update, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [text])

  return (
    <span
      ref={ref}
      className={cn('min-w-0 truncate', className)}
      title={isTruncated ? text : undefined}
      {...props}
    >
      {text}
    </span>
  )
}
