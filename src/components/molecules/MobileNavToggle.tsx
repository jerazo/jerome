import { Menu, X } from 'lucide-react'
import { forwardRef } from 'react'
import { cn } from '../../lib/cn'

type MobileNavToggleProps = {
  open: boolean
  menuId: string
  onToggle: () => void
  className?: string
}

export const MobileNavToggle = forwardRef<HTMLButtonElement, MobileNavToggleProps>(
  function MobileNavToggle({ open, menuId, onToggle, className }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'inline-flex h-11 w-11 items-center justify-center rounded-full border border-sand/10 bg-white/5 text-sand transition hover:border-gold-500/30 hover:bg-white/10 focus-visible:focus-ring',
          className,
        )}
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={onToggle}
      >
        {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
      </button>
    )
  },
)
