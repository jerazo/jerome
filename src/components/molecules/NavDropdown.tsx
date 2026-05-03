import { ChevronDown } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

export function NavDropdown({
  label,
  items,
  onNavigate,
}: {
  label: string
  items: Array<{ label: string; to: string }>
  onNavigate?: () => void
}) {
  const detailsRef = useRef<HTMLDetailsElement | null>(null)

  return (
    <details ref={detailsRef} className="group relative">
      <summary
        className={cn(
          'list-none rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-sand/70 transition',
          'hover:bg-white/5 hover:text-sand focus-visible:focus-ring',
          'cursor-pointer select-none',
        )}
      >
        <span className="inline-flex items-center gap-1">
          {label}
          <ChevronDown
            size={14}
            className="transition group-open:rotate-180 group-open:text-sand"
          />
        </span>
      </summary>
      <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-[280px] rounded-3xl border border-sand/10 bg-ink2/95 p-2 shadow-soft backdrop-blur">
        {items.map((it) => (
          <Link
            key={it.label}
            to={it.to}
            onClick={() => {
              detailsRef.current?.removeAttribute('open')
              onNavigate?.()
            }}
            className="block rounded-2xl px-4 py-3 text-sm font-semibold text-sand/80 hover:bg-white/5 hover:text-sand focus-visible:focus-ring"
          >
            {it.label}
          </Link>
        ))}
      </div>
    </details>
  )
}
