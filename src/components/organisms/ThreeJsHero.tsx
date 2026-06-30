import { lazy, Suspense, useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { Canvas } from '@react-three/fiber'
import { heroSlides } from '../../content/homeSections'
import { profile } from '../../content/profile'
import { cn } from '../../lib/cn'
import {
  detectWebGLSupport,
  HERO_FALLBACK_IMAGE,
  HERO_FALLBACK_SUBJECT,
  SLIDE_INTERVAL_MS,
  threeHeroCanvasProps,
} from '../../lib/threeSetup'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { HeroCarouselControls } from '../molecules/HeroCarouselControls'
import { HeroSlideCopy } from '../molecules/HeroSlideCopy'

const LazyHeroScene = lazy(() =>
  import('./ThreeJsHeroScene').then((module) => ({ default: module.ThreeJsHeroScene })),
)

function StaticHeroFallback({ activeIndex }: { activeIndex: number }) {
  const slide = heroSlides[activeIndex % heroSlides.length]

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <img
        src={HERO_FALLBACK_IMAGE}
        alt=""
        className="h-full w-full object-cover opacity-90"
        style={{ objectPosition: '54% 26%' }}
        loading="lazy"
        decoding="async"
      />
      <img
        src={HERO_FALLBACK_SUBJECT}
        alt={`Portrait of ${profile.name}`}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: '54% 26%' }}
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-black/45 to-black/70" />
      <p className="sr-only">{slide.eyebrow}</p>
    </div>
  )
}

function ThreeJsHeroCanvas({
  activeIndex,
  paused,
}: {
  activeIndex: number
  paused: boolean
}) {
  return (
    <Canvas className="absolute inset-0" {...threeHeroCanvasProps}>
      <Suspense fallback={null}>
        <LazyHeroScene activeIndex={activeIndex} paused={paused} />
      </Suspense>
    </Canvas>
  )
}

export function ThreeJsHero({
  activeIndex,
  onActiveIndexChange,
  bannerMessage,
  className,
}: {
  activeIndex: number
  onActiveIndexChange: (index: number, userInitiated?: boolean) => void
  bannerMessage?: string
  className?: string
}) {
  const reducedMotion = useReducedMotion()
  const parallaxRef = useRef<HTMLDivElement | null>(null)
  const [paused, setPaused] = useState(false)
  const [sceneReady, setSceneReady] = useState(false)
  const [webglSupported] = useState(() => detectWebGLSupport())

  const slide = useMemo(
    () => heroSlides[activeIndex % heroSlides.length],
    [activeIndex],
  )

  const slideTitle = useMemo(
    () => slide.titleLines.flat().map((part) => part.text).join(' '),
    [slide],
  )

  const useStaticFallback = reducedMotion || !webglSupported
  const showCanvas = !useStaticFallback && sceneReady

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setSceneReady(true))
    return () => window.cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    if (useStaticFallback || paused) return
    const id = window.setInterval(() => {
      onActiveIndexChange((activeIndex + 1) % heroSlides.length)
    }, SLIDE_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [activeIndex, onActiveIndexChange, paused, useStaticFallback])

  useEffect(() => {
    if (reducedMotion || useStaticFallback) return
    const root = parallaxRef.current
    if (!root) return

    let raf = 0
    let rect = root.getBoundingClientRect()
    const state = { tx: 0, ty: 0 }

    const apply = () => {
      raf = 0
      root.style.setProperty('--hero-foreground-x', `${state.tx.toFixed(2)}px`)
      root.style.setProperty('--hero-foreground-y', `${state.ty.toFixed(2)}px`)
      root.style.setProperty('--hero-background-x', `${(state.tx * 0.35).toFixed(2)}px`)
      root.style.setProperty('--hero-background-y', `${(state.ty * 0.35).toFixed(2)}px`)
    }

    const schedule = () => {
      if (raf) return
      raf = window.requestAnimationFrame(apply)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      rect = root.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const nx = rect.width ? (event.clientX - cx) / (rect.width / 2) : 0
      const ny = rect.height ? (event.clientY - cy) / (rect.height / 2) : 0
      state.tx = Math.max(-1, Math.min(1, nx)) * 14
      state.ty = Math.max(-1, Math.min(1, ny)) * 10
      schedule()
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [reducedMotion, useStaticFallback])

  const goPrev = () => {
    onActiveIndexChange((activeIndex - 1 + heroSlides.length) % heroSlides.length, true)
  }

  const goNext = () => {
    onActiveIndexChange((activeIndex + 1) % heroSlides.length, true)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goPrev()
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goNext()
    }
  }

  return (
    <section
      ref={parallaxRef}
      className={cn('relative min-h-[min(92vh,860px)] w-full', className)}
      aria-label={`Showcase hero carousel, slide ${activeIndex + 1} of ${heroSlides.length}: ${slide.eyebrow}. ${slideTitle}`}
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        const next = event.relatedTarget
        if (next instanceof Node && event.currentTarget.contains(next)) return
        setPaused(false)
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {useStaticFallback ? (
          <StaticHeroFallback activeIndex={activeIndex} />
        ) : showCanvas ? (
          <div
            className="absolute inset-0"
            style={{
              transform:
                'translate3d(var(--hero-background-x, 0px), var(--hero-background-y, 0px), 0)',
              willChange: 'transform',
            }}
          >
            <ThreeJsHeroCanvas activeIndex={activeIndex} paused={paused} />
          </div>
        ) : (
          <div
            className="absolute inset-0 animate-pulse bg-gradient-to-br from-ink2/80 via-black to-black"
            aria-hidden
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-black/20 to-black/55" />
      </div>

      <div
        className="relative z-10 flex min-h-[min(92vh,860px)] flex-col justify-end px-4 pb-10 pt-28 sm:px-6 sm:pb-12 lg:px-10"
        style={{
          transform:
            'translate3d(var(--hero-foreground-x, 0px), var(--hero-foreground-y, 0px), 0)',
          willChange: 'transform',
        }}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div className="mx-auto w-full max-w-screen-xl">
          <HeroSlideCopy
            key={activeIndex}
            slide={slide}
            animate={!useStaticFallback}
            glowActive={!useStaticFallback}
            showCta={false}
          />

          <div className="mt-4 border-t border-sand/10 pt-4">
            <HeroCarouselControls
              slides={heroSlides}
              activeIndex={activeIndex}
              onPrev={goPrev}
              onNext={goNext}
              onSelect={(index) => onActiveIndexChange(index, true)}
            />
          </div>

          {bannerMessage ? (
            <p className="mt-5 rounded-2xl border border-sand/10 bg-sand/5 px-4 py-3 text-center text-sm leading-relaxed text-sand/75 backdrop-blur-sm">
              {bannerMessage}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
