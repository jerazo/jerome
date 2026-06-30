import { Link } from 'react-router-dom'
import { ButtonLink, Container, LogoMark } from '@/components/atomic'
import { profile } from '../../content/profile'
import { useMobileNav } from '../../hooks/useMobileNav'
import { useUiStore } from '../../store/uiStore'
import { MobileNavToggle } from '../molecules/MobileNavToggle'
import { MobileNavPanel } from './MobileNavPanel'
import { PrimaryNav } from './PrimaryNav'

export function Header() {
  const mobileNavOpen = useUiStore((s) => s.mobileNavOpen)
  const setMobileNavOpen = useUiStore((s) => s.setMobileNavOpen)
  const { menuId, triggerRef, panelRef, toggle, close } = useMobileNav(mobileNavOpen, setMobileNavOpen)

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
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-sand/60">
                {profile.headline}
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-3 lg:flex">
            <PrimaryNav onNavigate={close} />
            <ButtonLink to="/#contact" size="sm" className="ml-1">
              Book a Call
            </ButtonLink>
          </div>

          <MobileNavToggle
            ref={triggerRef}
            open={mobileNavOpen}
            menuId={menuId}
            onToggle={toggle}
            className="md:hidden"
          />
        </Container>
      </div>

      {mobileNavOpen ? (
        <div ref={panelRef} className="md:hidden">
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/60"
            aria-label="Close navigation menu"
            onClick={close}
          />
          <div className="fixed inset-x-4 top-20 z-50 md:inset-x-auto md:right-4 md:left-auto md:w-[min(100%,20rem)]">
            <MobileNavPanel id={menuId} onNavigate={close} />
          </div>
        </div>
      ) : null}
    </header>
  )
}
