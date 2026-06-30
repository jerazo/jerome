import type { ILogoMarkProps } from '../atomic/types'
import { cn } from '../../lib/cn'

export function LogoMark({ className }: ILogoMarkProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-display text-[12px] font-bold tracking-[0.18em]',
        className,
      )}
      aria-label="JE logo mark"
    >
      <span className="bg-gradient-to-r from-gold-200 via-gold-300 to-sky-300 bg-clip-text text-transparent">
        JE
      </span>
    </span>
  )
}
