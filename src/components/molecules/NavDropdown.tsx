import { ChevronDown } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { NavHashLink } from '@/components/atomic'

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
  const isShowcase = location.pathname === '/showcase'
  const isActive = items.some((item) => {
    if (item.to.includes('#')) {
      const hashIndex = item.to.indexOf('#')
      const path = item.to.slice(0, hashIndex) || '/'
      const hash = item.to.slice(hashIndex)
      if (isShowcase && path === '/showcase') return hash === activeHash
      if (isHome && path === '/') return hash === activeHash
      return location.pathname === path && hash === activeHash
    }

    if (isHome) return false

    return location.pathname === item.to
  })

  useEffect(() => {
    const node = detailsRef.current
    if (!node) return

    const close = () => node.removeAttribute('open')

    const onPointerDown = (event: PointerEvent) => {
      if (!node.open) return
      const target = event.target
      if (target instanceof Node && !node.contains(target)) close()
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (!node.open) return

      if (event.key === 'Escape') {
        close()
        node.querySelector('summary')?.focus()
        return
      }

      const links = Array.from(node.querySelectorAll<HTMLAnchorElement>('a[href]'))
      if (links.length === 0) return

      const currentIndex = links.findIndex((link) => link === document.activeElement)
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        const next = links[(currentIndex + 1 + links.length) % links.length]
        next?.focus()
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        const prev = links[(currentIndex - 1 + links.length) % links.length]
        prev?.focus()
      }
      if (event.key === 'Home') {
        event.preventDefault()
        links[0]?.focus()
      }
      if (event.key === 'End') {
        event.preventDefault()
        links[links.length - 1]?.focus()
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <details ref={detailsRef} className="group relative">
      <summary
        className={cn(
          'list-none rounded-full px-2.5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-sand/70 transition xl:px-3 xl:tracking-[0.24em]',
          'inline-flex min-h-11 items-center hover:bg-white/5 hover:text-sand focus-visible:focus-ring',
          'cursor-pointer select-none [&::-webkit-details-marker]:hidden',
          isActive && 'bg-white/5 text-sand',
        )}
        aria-haspopup="menu"
        aria-label={`${label} navigation links`}
      >
        <span className="inline-flex items-center gap-1">
          {label}
          <ChevronDown
            size={14}
            className="transition group-open:rotate-180 group-open:text-sand"
            aria-hidden
          />
        </span>
      </summary>
      <div
        role="group"
        aria-label={`${label} links`}
        className="absolute left-1/2 top-[calc(100%+8px)] z-50 w-48 -translate-x-1/2 rounded-2xl border border-sand/10 bg-ink2/95 p-1.5 shadow-soft backdrop-blur"
      >
        {items.map((item) => (
          <NavHashLink
            key={item.to}
            to={item.to}
            onClick={() => {
              detailsRef.current?.removeAttribute('open')
              onNavigate?.()
            }}
            className={(active) =>
              cn(
                'flex min-h-11 items-center rounded-xl px-3 py-2 text-sm font-medium text-sand/80 transition hover:bg-white/5 hover:text-sand focus-visible:focus-ring',
                active && 'bg-white/5 text-sand',
              )
            }
          >
            {item.label}
          </NavHashLink>
        ))}
      </div>
    </details>
  )
}
