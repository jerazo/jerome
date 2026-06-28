import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Gutter } from '../atoms/Gutter'
import { LogoMark } from '../atoms/LogoMark'
import { ButtonLink } from '../atoms/ButtonLink'
import { HeroSlideCopy } from '../molecules/HeroSlideCopy'
import { MobileNavToggle } from '../molecules/MobileNavToggle'
import { heroSlides, pickHeroBannerMessage } from '../../content/homeSections'
import { profile } from '../../content/profile'
import { useMobileNav } from '../../hooks/useMobileNav'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useUiStore } from '../../store/uiStore'
import { MobileNavPanel } from './MobileNavPanel'
import { PrimaryNav } from './PrimaryNav'

export function HomeHero() {
  const reducedMotion = useReducedMotion()
  const mobileNavOpen = useUiStore((s) => s.mobileNavOpen)
  const setMobileNavOpen = useUiStore((s) => s.setMobileNavOpen)
  const { menuId, triggerRef, panelRef, toggle, close } = useMobileNav(mobileNavOpen, setMobileNavOpen)
  const desktopCopyRef = useRef<HTMLDivElement | null>(null)
  const heroParallaxRef = useRef<HTMLDivElement | null>(null)
  const [desktopObjectX, setDesktopObjectX] = useState('54%')
  const [bannerMessage] = useState(pickHeroBannerMessage)

  const slide = useMemo(() => heroSlides[0], [])

  useEffect(() => {
    const node = desktopCopyRef.current
    if (!node) return

    const compute = () => {
      const vw = window.innerWidth || 0
      if (!vw || vw < 1024) return

      const rect = node.getBoundingClientRect()
      const copyLeftPct = (rect.left / vw) * 100
      const target = copyLeftPct - 12
      const clamped = Math.min(72, Math.max(36, target))
      setDesktopObjectX(`${clamped.toFixed(1)}%`)
    }

    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(node)
    window.addEventListener('resize', compute, { passive: true })
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', compute)
    }
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const root = heroParallaxRef.current
    if (!root) return

    let raf = 0
    let rect = root.getBoundingClientRect()

    const state = {
      tx: 0,
      ty: 0,
      scrollY: 0,
    }

    const apply = () => {
      raf = 0
      root.style.setProperty('--hero-parallax-x', `${state.tx.toFixed(2)}px`)
      root.style.setProperty('--hero-parallax-y', `${state.ty.toFixed(2)}px`)
      root.style.setProperty('--hero-parallax-scroll', `${state.scrollY.toFixed(2)}px`)
    }

    const schedule = () => {
      if (raf) return
      raf = window.requestAnimationFrame(apply)
    }

    const updateRect = () => {
      rect = root.getBoundingClientRect()
    }

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const nx = rect.width ? (e.clientX - cx) / (rect.width / 2) : 0
      const ny = rect.height ? (e.clientY - cy) / (rect.height / 2) : 0
      const clampedX = Math.max(-1, Math.min(1, nx))
      const clampedY = Math.max(-1, Math.min(1, ny))

      state.tx = clampedX * 16
      state.ty = clampedY * 12
      schedule()
    }

    const onScroll = () => {
      const max = Math.max(1, window.innerHeight)
      const progress = Math.max(0, Math.min(1, window.scrollY / max))
      state.scrollY = progress * 34
      schedule()
    }

    const onResize = () => {
      updateRect()
      onScroll()
    }

    updateRect()
    onScroll()
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [reducedMotion])

  return (
    <section className="relative min-h-[72vh] bg-black lg:h-[72vh] lg:overflow-hidden">
      <div className="absolute inset-0 -z-10 vignette" />

      <div ref={heroParallaxRef} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-900/20 via-black/30 to-black/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.14),transparent_58%)]" />
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{ clipPath: 'polygon(0 0, 58% 0, 46% 100%, 0 100%)' }}
        >
          <div className="h-full w-full bg-gradient-to-r from-black/35 via-black/25 to-transparent" />
        </div>

        <div className="absolute inset-0 hidden w-full lg:block">
          <img
            src="/jerome-portrait-hero-background.webp"
            alt=""
            width={2409}
            height={900}
            className="h-full w-full object-cover opacity-95"
            style={{
              objectPosition: `${desktopObjectX} 26%`,
              transform:
                'translate3d(calc(var(--hero-parallax-x, 0px) * 0.7), calc(var(--hero-parallax-y, 0px) * 0.6 + var(--hero-parallax-scroll, 0px) * 1.05), 0) scale(1.04)',
              willChange: 'transform',
            }}
            loading="eager"
            decoding="async"
            aria-hidden
          />
          <img
            src="/jerome-portrait-hero-subject.webp"
            alt={`Portrait of ${profile.name}, ${profile.headline}`}
            width={2409}
            height={900}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              objectPosition: `${desktopObjectX} 26%`,
              transform:
                'translate3d(calc(var(--hero-parallax-x, 0px) * 1.35), calc(var(--hero-parallax-y, 0px) * 1.1 + var(--hero-parallax-scroll, 0px) * 0.8), 0) scale(1.02)',
              willChange: 'transform',
            }}
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/60 to-black/92" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25" />
        </div>
      </div>

      <div className="absolute inset-x-0 top-0 z-30">
        <div className="h-11 bg-gold-500 sm:h-12">
          <div className="flex h-full items-center justify-center px-3 sm:px-4">
            <p className="line-clamp-2 text-center text-[10px] font-semibold uppercase leading-snug tracking-[0.16em] text-white/90 sm:line-clamp-none sm:text-[11px] sm:leading-normal sm:tracking-[0.34em]">
              {bannerMessage}
            </p>
          </div>
        </div>
        <div className="bg-black/25 backdrop-blur-sm">
          <Gutter className="flex h-14 items-center justify-between gap-3 sm:h-20 sm:gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-gold-500 text-white">
                <LogoMark />
              </div>
              <div className="min-w-0 leading-tight">
                <p className="truncate text-sm font-semibold tracking-tight text-sand">{profile.name}</p>
                <p className="hidden text-[10px] font-semibold uppercase tracking-[0.32em] text-sand/55 sm:block">
                  {profile.headline}
                </p>
              </div>
            </div>

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

      <div className="relative z-10 pt-[6.25rem] sm:pt-[6.75rem] lg:h-full lg:pt-28">
        <div className="lg:hidden">
          <Gutter className="pb-6 pt-2">
            <div className="relative aspect-[5/6] w-full max-h-[min(64vw,280px)] overflow-hidden rounded-3xl border border-sand/10 bg-ink2/40 shadow-soft">
              <img
                src="/jerome-portrait-square.webp"
                alt={`Portrait of ${profile.name}, ${profile.headline}`}
                width={900}
                height={900}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: '55% 16%' }}
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
            </div>

            <div className="mt-2">
              <HeroSlideCopy slide={slide} animate={!reducedMotion} compact showCta={false} />
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t border-sand/10 pt-4">
              <ButtonLink to="/showcase" className="w-full justify-center shadow-gold-glow">
                Enter the showcase <ArrowRight size={15} aria-hidden />
              </ButtonLink>
              <p className="text-center text-xs leading-relaxed text-sand/55">
                Explore the full Three.js hero and album-flow gallery on the{' '}
                <Link to="/showcase" className="text-gold-200/90 underline-offset-2 hover:underline">
                  showcase page
                </Link>
                .
              </p>
            </div>
          </Gutter>
        </div>

        <Gutter className="hidden h-full content-center gap-6 pb-6 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5" />
          <div className="lg:col-span-7 lg:pl-2">
            <div ref={desktopCopyRef}>
              <HeroSlideCopy slide={slide} animate={!reducedMotion} showCta={false} />

              <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-sand/10 pt-4">
                <ButtonLink to="/showcase" className="shadow-gold-glow">
                  Enter the showcase <ArrowRight size={15} aria-hidden />
                </ButtonLink>
                <p className="max-w-md text-sm text-sand/60">
                  Full immersive Three.js carousel and Apple-style project album on{' '}
                  <Link to="/showcase" className="text-gold-200/90 underline-offset-2 hover:underline">
                    /showcase
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </Gutter>
      </div>
    </section>
  )
}
