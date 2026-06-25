import { useEffect, useRef, useState, type HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type TruncatedTextProps = HTMLAttributes<HTMLSpanElement> & {
  text: string
}

export function TruncatedText({ text, className, ...props }: TruncatedTextProps) {
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
