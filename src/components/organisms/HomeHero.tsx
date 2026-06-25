import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { ButtonLink } from '../atoms/ButtonLink'
import { Gutter } from '../atoms/Gutter'
import { LogoMark } from '../atoms/LogoMark'
import { HeroCarouselControls } from '../molecules/HeroCarouselControls'
import { HeroSlideCopy } from '../molecules/HeroSlideCopy'
import { heroSlides, pickHeroBannerMessage } from '../../content/homeSections'
import { profile } from '../../content/profile'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useUiStore } from '../../store/uiStore'
import { MobileNavPanel } from './MobileNavPanel'
import { PrimaryNav } from './PrimaryNav'

const SLIDE_INTERVAL_MS = 7000

export function HomeHero() {
  const reducedMotion = useReducedMotion()
  const mobileNavOpen = useUiStore((s) => s.mobileNavOpen)
  const setMobileNavOpen = useUiStore((s) => s.setMobileNavOpen)
  const heroIndex = useUiStore((s) => s.homeHeroIndex)
  const setHeroIndex = useUiStore((s) => s.setHomeHeroIndex)
  const desktopCopyRef = useRef<HTMLDivElement | null>(null)
  const heroParallaxRef = useRef<HTMLDivElement | null>(null)
  const [desktopObjectX, setDesktopObjectX] = useState('54%')
  const [paused, setPaused] = useState(false)
  const [bannerMessage] = useState(pickHeroBannerMessage)

  const slide = useMemo(() => heroSlides[heroIndex % heroSlides.length], [heroIndex])

  useEffect(() => {
    if (reducedMotion || paused) return
    const id = window.setInterval(() => {
      setHeroIndex((index) => (index + 1) % heroSlides.length)
    }, SLIDE_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [heroIndex, paused, reducedMotion, setHeroIndex])

  const totalSlides = heroSlides.length

  function goPrev() {
    setHeroIndex((heroIndex - 1 + totalSlides) % totalSlides)
  }

  function goNext() {
    setHeroIndex((heroIndex + 1) % totalSlides)
  }

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
    <section className="relative h-svh overflow-hidden bg-black">
      <div className="absolute inset-0 -z-10 vignette" />

      <div ref={heroParallaxRef} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-black/80" />
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{ clipPath: 'polygon(0 0, 58% 0, 46% 100%, 0 100%)' }}
        >
          <div className="h-full w-full bg-gradient-to-r from-black/35 via-black/25 to-transparent" />
        </div>

        <div className="absolute inset-0 hidden w-full lg:block">
          <img
            src="/jerome-portrait-hero-background.png"
            alt=""
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
            src="/jerome-portrait-hero-subject.png"
            alt={profile.name}
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
        <div className="h-12 bg-gold-500">
          <div className="flex h-full items-center justify-center px-4">
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-white/90 sm:tracking-[0.34em]">
              {bannerMessage}
            </p>
          </div>
        </div>
        <div className="bg-black/25 backdrop-blur-sm">
          <Gutter className="flex h-16 items-center justify-between gap-4 sm:h-20">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gold-500 text-white">
                <LogoMark />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold tracking-tight text-sand">{profile.name}</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-sand/55">
                  {profile.headline}
                </p>
              </div>
            </div>

            <PrimaryNav onNavigate={() => setMobileNavOpen(false)} />

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-sand/10 bg-white/5 p-3 text-sand transition hover:border-gold-500/30 hover:bg-white/10 focus-visible:focus-ring lg:hidden"
              aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              {mobileNavOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </Gutter>

          {mobileNavOpen ? (
            <div className="lg:hidden">
              <Gutter className="pb-4 pt-2">
                <MobileNavPanel onNavigate={() => setMobileNavOpen(false)} />
              </Gutter>
            </div>
          ) : null}
        </div>
      </div>

      <div
        className="relative z-10 h-full pt-28 sm:pt-32"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div className="lg:hidden">
          <div className="flex h-full flex-col">
            <div className="-mx-4 sm:-mx-6">
              <div className="relative h-[46svh] min-h-[300px] w-full bg-black">
                <img
                  src="/jerome-portrait-square.jpg"
                  alt={profile.name}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: '55% 22%' }}
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/95" />
              </div>
            </div>

            <Gutter className="-mt-[8svh] flex min-h-0 flex-1 flex-col pb-0 pt-8">
              <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[calc(100%+8svh)] bg-gradient-to-b from-black/0 via-black/75 to-black" />

              <div className="relative flex min-h-0 flex-1 flex-col pb-32">
                <HeroSlideCopy
                  key={heroIndex}
                  slide={slide}
                  animate={!reducedMotion}
                  showCta={false}
                  titleClassName="text-[38px]"
                />

                <div className="absolute inset-x-0 bottom-0">
                  <div className="rounded-t-3xl border border-sand/10 bg-black/80 pb-[calc(20px+env(safe-area-inset-bottom))] pt-5 backdrop-blur-md">
                    <div className="flex flex-col items-stretch gap-4">
                      <ButtonLink to={slide.ctaTo} className="w-full justify-center">
                        {slide.ctaLabel} <ArrowRight size={16} />
                      </ButtonLink>
                      <HeroCarouselControls
                        slides={heroSlides}
                        activeIndex={heroIndex}
                        onPrev={goPrev}
                        onNext={goNext}
                        onSelect={setHeroIndex}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Gutter>
          </div>
        </div>

        <Gutter className="hidden h-full content-center gap-8 pb-10 lg:grid lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5" />
          <div className="lg:col-span-7 lg:pl-2">
            <div ref={desktopCopyRef}>
              <HeroSlideCopy key={heroIndex} slide={slide} animate={!reducedMotion} showCta={false} />

              <div className="mt-6 flex flex-col items-start gap-4 sm:mt-7">
                <ButtonLink to={slide.ctaTo}>
                  {slide.ctaLabel} <ArrowRight size={16} />
                </ButtonLink>
                <HeroCarouselControls
                  slides={heroSlides}
                  activeIndex={heroIndex}
                  onPrev={goPrev}
                  onNext={goNext}
                  onSelect={setHeroIndex}
                />
              </div>
            </div>
          </div>
        </Gutter>
      </div>
    </section>
  )
}
