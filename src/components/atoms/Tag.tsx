import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export function Tag({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-sand/15 bg-white/5 px-3 py-1 text-xs text-sand/80',
        className,
      )}
      {...props}
    />
  )
}

