import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { profile } from '../../content/profile'
import { useShowcaseProjectHash } from '../../hooks/useShowcaseProjectHash'
import { useMobileNav } from '../../hooks/useMobileNav'
import { useUiStore } from '../../store/uiStore'
import { cn } from '../../lib/cn'
import { Gutter, LogoMark } from '@/components/atomic'
import { MobileNavToggle } from '../molecules/MobileNavToggle'
import { MobileNavPanel } from './MobileNavPanel'
import { PrimaryNav } from './PrimaryNav'

export function ShowcaseLayout({
  children,
  className,
  onProjectHash,
}: {
  children: ReactNode
  className?: string
  onProjectHash?: (slug: string | null) => void
}) {
  const mobileNavOpen = useUiStore((s) => s.mobileNavOpen)
  const setMobileNavOpen = useUiStore((s) => s.setMobileNavOpen)
  const { menuId, triggerRef, panelRef, toggle, close } = useMobileNav(mobileNavOpen, setMobileNavOpen)

  useShowcaseProjectHash({ onProjectSlug: onProjectHash })

  return (
    <div
      className={cn(
        'relative min-h-svh overflow-x-clip bg-[#070707]',
        'bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,rgba(202,138,4,0.08),transparent_55%)]',
        'bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),rgba(0,0,0,0.92))]',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 vignette opacity-80" aria-hidden />

      <div className="absolute inset-x-0 top-0 z-40">
        <div className="bg-black/25 backdrop-blur-sm">
          <Gutter className="flex h-14 items-center justify-between gap-3 sm:h-20 sm:gap-4">
            <Link
              to="/"
              className="group inline-flex min-w-0 items-center gap-3 focus-visible:focus-ring"
            >
              <div className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-gold-500 text-white">
                <LogoMark />
              </div>
              <div className="min-w-0 leading-tight">
                <p className="truncate text-sm font-semibold tracking-tight text-sand">{profile.name}</p>
                <p className="hidden text-[10px] font-semibold uppercase tracking-[0.32em] text-sand/55 sm:block">
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
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  )
}
