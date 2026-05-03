import { Menu, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { ButtonLink } from '../atoms/ButtonLink'
import { Container } from '../atoms/Container'
import { cn } from '../../lib/cn'
import { useUiStore } from '../../store/uiStore'
import { PrimaryNav } from './PrimaryNav'

const mobileNav = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const

export function Header() {
  const mobileNavOpen = useUiStore((s) => s.mobileNavOpen)
  const setMobileNavOpen = useUiStore((s) => s.setMobileNavOpen)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="h-2 bg-gold-600" />
      <div className="border-b border-sand/10 bg-ink/70 backdrop-blur">
        <Container className="flex h-14 items-center justify-between sm:h-16">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 focus-visible:focus-ring"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold-500 text-black shadow-soft">
              <span className="flex gap-1">
                <span className="h-4 w-1 -skew-x-12 bg-black/90" />
                <span className="h-4 w-1 -skew-x-12 bg-black/90" />
                <span className="h-4 w-1 -skew-x-12 bg-black/90" />
              </span>
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight text-sand">Jerome Erazo</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-sand/55">
                Software Engineer • Tech Lead
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-3 lg:flex">
            <PrimaryNav onNavigate={() => setMobileNavOpen(false)} />
            <ButtonLink to="/contact" size="sm" className="ml-1">
              Book a Call
            </ButtonLink>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-sand/10 bg-white/5 p-3 text-sand transition hover:border-gold-500/30 hover:bg-white/10 focus-visible:focus-ring md:hidden"
            aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            {mobileNavOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </Container>
      </div>

      {mobileNavOpen ? (
        <div className="md:hidden">
          <div
            className="fixed inset-0 z-40 bg-black/60"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="fixed inset-x-4 top-20 z-50 rounded-3xl border border-sand/10 bg-ink2/95 p-4 shadow-soft backdrop-blur">
            <div className="grid gap-2">
              {mobileNav.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  onClick={() => setMobileNavOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'rounded-2xl px-4 py-3 text-sm font-semibold text-sand/80 hover:bg-white/5 focus-visible:focus-ring',
                      isActive && 'bg-white/5 text-sand',
                    )
                  }
                >
                  {n.label}
                </NavLink>
              ))}
              <ButtonLink
                to="/contact"
                className="w-full justify-center"
                onClick={() => setMobileNavOpen(false)}
              >
                Let’s build something
              </ButtonLink>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
