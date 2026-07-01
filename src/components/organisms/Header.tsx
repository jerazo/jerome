import { Link } from 'react-router-dom'
import { Gutter, LogoMark } from '@/components/atomic'
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
        <Gutter className="flex h-14 items-center justify-between gap-3 sm:h-16 sm:gap-4">
          <Link
            to="/"
            className="group inline-flex min-w-0 items-center gap-3 focus-visible:focus-ring"
          >
            <span className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-gold-500 text-white shadow-soft">
              <LogoMark />
            </span>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-semibold tracking-tight text-sand">{profile.name}</p>
              <p className="hidden truncate text-[10px] font-semibold uppercase tracking-[0.32em] text-sand/60 sm:block">
                {profile.headline}
              </p>
            </div>
          </Link>

          <PrimaryNav onNavigate={close} />

          <MobileNavToggle
            ref={triggerRef}
            open={mobileNavOpen}
            menuId={menuId}
            onToggle={toggle}
            className="lg:hidden"
          />
        </Gutter>

        {mobileNavOpen ? (
          <div ref={panelRef} className="lg:hidden">
            <Gutter className="pb-4 pt-2">
              <MobileNavPanel id={menuId} onNavigate={close} />
            </Gutter>
          </div>
        ) : null}
      </div>
    </header>
  )
}
