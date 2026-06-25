import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Menu, X } from 'lucide-react'
import { ButtonLink } from '../atoms/ButtonLink'
import { Gutter } from '../atoms/Gutter'
import { LogoMark } from '../atoms/LogoMark'
import { cn } from '../../lib/cn'
import { heroSlides } from '../../content/homeSections'
import { profile } from '../../content/profile'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useUiStore } from '../../store/uiStore'
import { PrimaryNav } from './PrimaryNav'

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

  const slide = useMemo(() => heroSlides[heroIndex % heroSlides.length], [heroIndex])

  useEffect(() => {
    if (reducedMotion || paused) return
    const id = window.setInterval(() => {
      setHeroIndex((heroIndex + 1) % heroSlides.length)
    }, 6500)
    return () => window.clearInterval(id)
  }, [heroIndex, paused, reducedMotion, setHeroIndex])

  const totalSlides = heroSlides.length
  const current = (heroIndex % totalSlides) + 1

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
      if (!vw) return

      if (vw < 1024) return

      const rect = node.getBoundingClientRect()
      const copyLeftPct = (rect.left / vw) * 100

      // Keep the face visually close to the copy block across viewport sizes.
      // We bias the focal point slightly left of the copy block's left edge.
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
      // Ignore touch; it tends to feel jittery and conflicts with scrolling.
      if (e.pointerType === 'touch') return
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const nx = rect.width ? (e.clientX - cx) / (rect.width / 2) : 0
      const ny = rect.height ? (e.clientY - cy) / (rect.height / 2) : 0
      const clampedX = Math.max(-1, Math.min(1, nx))
      const clampedY = Math.max(-1, Math.min(1, ny))

      // Stronger than before but still controlled (desktop-only pointer parallax).
      state.tx = clampedX * 16
      state.ty = clampedY * 12
      schedule()
    }

    const onScroll = () => {
      // Small downward drift as you scroll away from the hero.
      const max = Math.max(1, window.innerHeight)
      const progress = Math.max(0, Math.min(1, window.scrollY / max))
      // Make scroll parallax clearly noticeable as you move past the hero.
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

      {/* Full-height hero background (sits behind the overlay header) */}
      <div ref={heroParallaxRef} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-black/80" />
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{ clipPath: 'polygon(0 0, 58% 0, 46% 100%, 0 100%)' }}
        >
          <div className="h-full w-full bg-gradient-to-r from-black/35 via-black/25 to-transparent" />
        </div>

        {/* Desktop portrait: layered PNGs with subtle parallax */}
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
          {/* Readability overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/55 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />
        </div>
      </div>

      <div className="absolute inset-x-0 top-0 z-30">
        <div className="h-12 bg-gold-500">
          <div className="flex h-full items-center justify-center px-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-white/90">
              Rewrite your product from tech debt and instability.
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
                <p className="text-sm font-semibold tracking-tight text-sand">Jerome Erazo</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-sand/55">
                  Software Engineer • Tech Lead • AI Enthusiast
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
              <Gutter className="pb-4 pt-4">
                <div className="rounded-3xl border border-sand/10 bg-ink2/70 p-4 shadow-soft">
                  <div className="grid gap-2 text-sm font-semibold text-sand/80">
                    <Link
                      className="rounded-2xl px-4 py-3 hover:bg-white/5"
                      to="/#featured"
                      onClick={() => setMobileNavOpen(false)}
                    >
                      Featured
                    </Link>
                    <Link
                      className="rounded-2xl px-4 py-3 hover:bg-white/5"
                      to="/#services"
                      onClick={() => setMobileNavOpen(false)}
                    >
                      Services
                    </Link>
                    <Link
                      className="rounded-2xl px-4 py-3 hover:bg-white/5"
                      to="/#about"
                      onClick={() => setMobileNavOpen(false)}
                    >
                      About
                    </Link>
                    <Link
                      className="rounded-2xl px-4 py-3 hover:bg-white/5"
                      to="/#portfolio"
                      onClick={() => setMobileNavOpen(false)}
                    >
                      Portfolio
                    </Link>
                    <Link
                      className="rounded-2xl px-4 py-3 hover:bg-white/5"
                      to="/#work"
                      onClick={() => setMobileNavOpen(false)}
                    >
                      Experience
                    </Link>
                    <Link
                      className="rounded-2xl px-4 py-3 hover:bg-white/5"
                      to="/#resume"
                      onClick={() => setMobileNavOpen(false)}
                    >
                      Resume
                    </Link>
                    <Link
                      className="rounded-2xl px-4 py-3 hover:bg-white/5"
                      to="/#recommendations"
                      onClick={() => setMobileNavOpen(false)}
                    >
                      Recommendations
                    </Link>
                    <ButtonLink
                      to="/#about"
                      variant="secondary"
                      className="w-full justify-center"
                      onClick={() => setMobileNavOpen(false)}
                    >
                      About
                    </ButtonLink>
                    <ButtonLink
                      to="/#contact"
                      className="w-full justify-center"
                      onClick={() => setMobileNavOpen(false)}
                    >
                      Contact
                    </ButtonLink>
                  </div>
                </div>
              </Gutter>
            </div>
          ) : null}
        </div>
      </div>

      {/* Foreground content (offset so it doesn't sit under the overlay header) */}
      <div
        className="relative z-10 h-full pt-28 sm:pt-32"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {/* Mobile stack (like the reference phone layout) */}
        <div className="lg:hidden">
          <div className="flex h-full flex-col">
            <div className="-mx-4 sm:-mx-6">
              <div className="relative h-[50svh] min-h-[320px] w-full bg-black">
                <img
                  src="/jerome-portrait-square.jpg"
                  alt={profile.name}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: '55% 25%' }}
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black/95" />
              </div>
            </div>

            <Gutter className="-mt-[10svh] flex min-h-0 flex-1 flex-col pb-0 pt-10">
              <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[calc(100%+10svh)] bg-gradient-to-b from-black/0 via-black/70 to-black" />

              <div className="relative flex min-h-0 flex-1 flex-col pb-28">
                <div className="flex items-start gap-3">
                  <span className="mt-1 text-3xl text-gold-300">“</span>
                  <div className="min-w-0">
                    <p className="text-sm leading-relaxed text-sand/70">{slide.quote}</p>
                  </div>
                </div>

                <h1 className="mt-6 font-display text-[44px] font-semibold leading-[0.92] tracking-tight text-sand">
                  <span className="block">{slide.titleLines[0].text}</span>
                  <span className="block">
                    <span
                      className={cn(
                        slide.titleLines[1]?.accent && 'text-gold-300',
                        slide.titleLines[1]?.italic && 'italic',
                      )}
                    >
                      {slide.titleLines[1]?.text}
                    </span>{' '}
                    <span className="text-sand">{slide.titleLines[2].text}</span>
                  </span>
                  <span className="block">{slide.titleLines[3].text}</span>
                  <span className="block">
                    {slide.titleLines[4].accent ? (
                      <span className={cn('text-gold-300', slide.titleLines[4].italic && 'italic')}>
                        {slide.titleLines[4].text}.
                      </span>
                    ) : (
                      `${slide.titleLines[4].text}.`
                    )}
                  </span>
                </h1>

                <p className="mt-4 text-sm leading-relaxed text-sand/70">{slide.description}</p>

                {/* Bottom-anchored carousel controls (steady CTA position) */}
                <div className="absolute inset-x-0 bottom-0">
                  <div className="bg-gradient-to-b from-black/0 via-black/75 to-black pb-[calc(24px+env(safe-area-inset-bottom))] pt-6">
                    <div className="mb-4 flex items-center justify-center gap-2">
                      {heroSlides.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          aria-label={`Go to slide ${i + 1}`}
                          className={cn(
                            'h-2 w-2 rounded-full transition',
                            i === heroIndex ? 'bg-gold-300' : 'bg-sand/25 hover:bg-sand/40',
                          )}
                          onClick={() => setHeroIndex(i)}
                        />
                      ))}
                    </div>

                    <ButtonLink to={slide.ctaTo} className="w-full justify-center">
                      {slide.ctaLabel} <ArrowRight size={16} />
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </Gutter>
          </div>
        </div>

        {/* Desktop right-side poster layout */}
        <Gutter className="hidden h-full content-center gap-8 pb-10 lg:grid lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5" />
          <div className="lg:col-span-7 lg:pl-2">
            <div className="flex items-start gap-4">
              <span className="mt-3 text-4xl text-gold-300">“</span>
              <div ref={desktopCopyRef} className="min-w-0">
                <p className="max-w-2xl text-sm leading-relaxed text-sand/70 sm:text-base">
                  {slide.quote}
                </p>

                <h1 className="mt-6 font-display text-[44px] font-semibold leading-[0.92] tracking-tight text-sand sm:text-[64px]">
                  <span className="block">{slide.titleLines[0].text}</span>
                  <span className="block">
                    <span
                      className={cn(
                        slide.titleLines[1]?.accent && 'text-gold-300',
                        slide.titleLines[1]?.italic && 'italic',
                      )}
                    >
                      {slide.titleLines[1]?.text}
                    </span>{' '}
                    <span className="text-sand">{slide.titleLines[2].text}</span>
                  </span>
                  <span className="block">{slide.titleLines[3].text}</span>
                  <span className="block">
                    {slide.titleLines[4].accent ? (
                      <span
                        className={cn('text-gold-300', slide.titleLines[4].italic && 'italic')}
                      >
                        {slide.titleLines[4].text}.
                      </span>
                    ) : (
                      `${slide.titleLines[4].text}.`
                    )}
                  </span>
                </h1>

                <p className="mt-5 max-w-xl text-sm leading-relaxed text-sand/70 sm:text-base">
                  {slide.description}
                </p>

                <div className="mt-7">
                  <ButtonLink to={slide.ctaTo}>
                    {slide.ctaLabel} <ArrowRight size={16} />
                  </ButtonLink>
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={goPrev}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-sand/10 bg-white/5 text-sand/80 transition hover:border-gold-500/30 hover:bg-white/10 focus-visible:focus-ring"
                      aria-label="Previous slide"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-sand/10 bg-white/5 text-sand/80 transition hover:border-gold-500/30 hover:bg-white/10 focus-visible:focus-ring"
                      aria-label="Next slide"
                    >
                      <ArrowRight size={18} />
                    </button>
                  </div>

                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <p className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.32em] text-sand/55">
                      {String(current).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                    </p>
                    <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        key={heroIndex}
                        className={cn(
                          'absolute inset-y-0 left-0 w-full origin-left rounded-full bg-gold-400/70',
                          reducedMotion || paused ? '' : 'animate-[hero-progress_6.5s_linear]',
                        )}
                        style={{ transform: reducedMotion || paused ? 'scaleX(0.65)' : undefined }}
                      />
                    </div>
                  </div>

                  <div className="hidden items-center gap-2 xl:flex">
                    {heroSlides.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Go to slide ${i + 1}`}
                        className={cn(
                          'h-2.5 w-2.5 rounded-full transition',
                          i === heroIndex ? 'bg-gold-300' : 'bg-sand/25 hover:bg-sand/40',
                        )}
                        onClick={() => setHeroIndex(i)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Gutter>
      </div>
    </section>
  )
}
