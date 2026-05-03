import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export function Gutter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('w-full px-4 sm:px-6 lg:px-10 2xl:px-16', className)}
      {...props}
    />
  )
}

