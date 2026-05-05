import { ChevronDown } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
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
  const location = useLocation()
  const activeHash = location.hash
  const isHome = location.pathname === '/'
  const isActive =
    isHome &&
    items.some((it) => {
      const hash = it.to.startsWith('/#') ? it.to.slice(1) : ''
      return hash && hash === activeHash
    })

  return (
    <details ref={detailsRef} className="group relative">
      <summary
        className={cn(
          'list-none rounded-full px-2 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-sand/70 transition xl:px-3 xl:text-[11px] xl:tracking-[0.26em]',
          'hover:bg-white/5 hover:text-sand focus-visible:focus-ring',
          'cursor-pointer select-none',
          isActive && 'bg-white/5 text-sand',
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
