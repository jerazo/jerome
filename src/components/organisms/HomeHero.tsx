import { useEffect, useMemo } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { ButtonLink } from '../atoms/ButtonLink'
import { Gutter } from '../atoms/Gutter'
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

  const slide = useMemo(() => heroSlides[heroIndex % heroSlides.length], [heroIndex])

  useEffect(() => {
    if (reducedMotion) return
    const id = window.setInterval(() => {
      setHeroIndex((heroIndex + 1) % heroSlides.length)
    }, 6500)
    return () => window.clearInterval(id)
  }, [heroIndex, reducedMotion, setHeroIndex])

  return (
    <section className="relative h-svh overflow-hidden bg-black">
      <div className="absolute inset-0 -z-10 vignette" />

      {/* Full-height hero background (sits behind the overlay header) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-black/80" />
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{ clipPath: 'polygon(0 0, 58% 0, 46% 100%, 0 100%)' }}
        >
          <div className="h-full w-full bg-gradient-to-r from-black/35 via-black/25 to-transparent" />
        </div>

        <div className="absolute inset-y-0 left-0 hidden w-full lg:block lg:w-[56%]">
          <img
            src="/jerome-portrait-hero.jpg"
            alt={profile.name}
            className="h-full w-full object-cover opacity-95"
            style={{
              objectPosition: '66% 26%',
              maskImage:
                'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
            }}
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-black/45 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />

          <div className="absolute bottom-8 left-8">
            <div className="grid place-items-center rounded-full border border-gold-500/35 bg-black/20 px-5 py-5 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-gold-100/80">
                New
              </p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.34em] text-gold-100/80">
                Here?
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 top-0 z-30">
        <div className="h-12 bg-gold-500">
          <div className="flex h-full items-center justify-center px-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-black/85">
              Rewrite your product from tech debt and instability.
            </p>
          </div>
        </div>
        <div className="bg-black/25 backdrop-blur-sm">
          <Gutter className="flex h-16 items-center justify-between gap-4 sm:h-20">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gold-500 text-black">
                <div className="flex gap-1">
                  <span className="h-4 w-1 -skew-x-12 bg-black/90" />
                  <span className="h-4 w-1 -skew-x-12 bg-black/90" />
                  <span className="h-4 w-1 -skew-x-12 bg-black/90" />
                </div>
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold tracking-tight text-sand">Jerome Erazo</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-sand/55">
                  Software Engineer • Tech Lead
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
                    <a
                      className="rounded-2xl px-4 py-3 hover:bg-white/5"
                      href="#services"
                      onClick={() => setMobileNavOpen(false)}
                    >
                      Services
                    </a>
                    <a
                      className="rounded-2xl px-4 py-3 hover:bg-white/5"
                      href="#work"
                      onClick={() => setMobileNavOpen(false)}
                    >
                      Work
                    </a>
                    <ButtonLink
                      to="/about"
                      variant="secondary"
                      className="w-full justify-center"
                      onClick={() => setMobileNavOpen(false)}
                    >
                      About
                    </ButtonLink>
                    <ButtonLink
                      to="/contact"
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
      <div className="relative z-10 h-full pt-28 sm:pt-32">
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
                    <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-sand/55">
                      {slide.source}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-sand/70">{slide.quote}</p>
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
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-sand/55">
                  {slide.source}
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-sand/70 sm:text-base">
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

                <div className="mt-8 flex items-center gap-2">
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
              </div>
            </div>
          </div>
        </Gutter>
      </div>
    </section>
  )
}
