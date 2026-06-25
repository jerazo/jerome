import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ButtonLink } from '../atoms/ButtonLink'
import { Container } from '../atoms/Container'
import { LogoMark } from '../atoms/LogoMark'
import { profile } from '../../content/profile'
import { useUiStore } from '../../store/uiStore'
import { MobileNavPanel } from './MobileNavPanel'
import { PrimaryNav } from './PrimaryNav'

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
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold-500 text-white shadow-soft">
              <LogoMark />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight text-sand">{profile.name}</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-sand/55">
                {profile.headline}
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-3 lg:flex">
            <PrimaryNav onNavigate={() => setMobileNavOpen(false)} />
            <ButtonLink to="/#contact" size="sm" className="ml-1">
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
          <div className="fixed inset-x-4 top-20 z-50 md:inset-x-auto md:right-4 md:left-auto md:w-[min(100%,20rem)]">
            <MobileNavPanel onNavigate={() => setMobileNavOpen(false)} />
          </div>
        </div>
      ) : null}
    </header>
  )
}
