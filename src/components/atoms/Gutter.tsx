import type { IGutterProps } from '../atomic/types'
import { cn } from '../../lib/cn'

export function Gutter({ className, ...props }: IGutterProps) {
  return (
    <div
      className={cn('w-full px-4 sm:px-6 lg:px-10 2xl:px-16', className)}
      {...props}
    />
  )
}
