import { cn } from '../../lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md'

export function buttonClassName({
  variant,
  size,
  className,
}: {
  variant: ButtonVariant
  size: ButtonSize
  className?: string
}) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-2xl border px-5 py-3 text-sm font-semibold tracking-wide transition',
    'focus-visible:focus-ring disabled:pointer-events-none disabled:opacity-50',
    size === 'sm' && 'px-4 py-2 text-xs',
    variant === 'primary' &&
      'border-gold-600/60 bg-gold-700 text-white shadow-gold-glow hover:bg-gold-600',
    variant === 'secondary' &&
      'border-white/15 bg-white/0 text-sand hover:border-white/25 hover:bg-white/5',
    variant === 'ghost' &&
      'border-transparent bg-transparent text-sand/70 hover:bg-white/5 hover:text-sand',
    className,
  )
}
