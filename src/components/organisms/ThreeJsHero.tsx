import { Suspense, useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html } from '@react-three/drei'
import { animated, useSpring } from '@react-spring/three'
import type { Group } from 'three'
import { heroSlides, type HeroSlide } from '../../content/homeSections'
import { cn } from '../../lib/cn'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { HeroCarouselControls } from '../molecules/HeroCarouselControls'
import { HeroSlideCopy } from '../molecules/HeroSlideCopy'

const SLIDE_INTERVAL_MS = 7000
const CAROUSEL_RADIUS = 3.2

const AnimatedGroup = animated.group

function slideAngle(index: number, activeIndex: number, total: number) {
  const offset = index - activeIndex
  const wrapped =
    offset > total / 2 ? offset - total : offset < -total / 2 ? offset + total : offset
  return wrapped * 0.72
}

function HeroSlidePanel({
  slide,
  index,
  activeIndex,
  total,
}: {
  slide: HeroSlide
  index: number
  activeIndex: number
  total: number
}) {
  const isActive = index === activeIndex
  const angle = slideAngle(index, activeIndex, total)

  const spring = useSpring({
    posX: Math.sin(angle) * CAROUSEL_RADIUS,
    posY: isActive ? 0.15 : -0.05,
    posZ: Math.cos(angle) * CAROUSEL_RADIUS - 2.4,
    rotY: -angle + Math.PI,
    scale: isActive ? 1.08 : 0.82,
    config: { tension: 170, friction: 22 },
  })

  return (
    <AnimatedGroup
      position-x={spring.posX}
      position-y={spring.posY}
      position-z={spring.posZ}
      rotation-y={spring.rotY}
      scale={spring.scale}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.35, 1.45, 0.08]} />
        <meshStandardMaterial
          color={isActive ? '#ca8a04' : '#1a1a1a'}
          emissive={isActive ? '#ca8a04' : '#000000'}
          emissiveIntensity={isActive ? 0.35 : 0}
          metalness={0.55}
          roughness={0.35}
        />
      </mesh>
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[2.2, 1.3, 0.02]} />
        <meshStandardMaterial color="#0b0b0b" metalness={0.2} roughness={0.85} />
      </mesh>
      {isActive ? (
        <Html transform distanceFactor={6} position={[0, 0, 0.12]} occlude>
          <div className="pointer-events-none w-[220px] select-none text-center">
            <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-gold-200/80">
              {slide.eyebrow}
            </p>
            <p className="mt-1 font-display text-sm font-semibold text-sand">
              {slide.titleLines.flat().map((part) => part.text).join(' ')}
            </p>
          </div>
        </Html>
      ) : null}
    </AnimatedGroup>
  )
}

function HeroScene({
  activeIndex,
  paused,
}: {
  activeIndex: number
  paused: boolean
}) {
  const rigRef = useRef<Group>(null)

  useFrame((state) => {
    if (!rigRef.current || paused) return
    const t = state.clock.getElapsedTime()
    rigRef.current.rotation.y = Math.sin(t * 0.18) * 0.08
    rigRef.current.position.y = Math.sin(t * 0.35) * 0.04
  })

  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 3]} intensity={1.1} color="#fff7ed" />
      <pointLight position={[-3, 2, 2]} intensity={0.65} color="#ca8a04" />
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
        <group ref={rigRef}>
          {heroSlides.map((slide, index) => (
            <HeroSlidePanel
              key={slide.eyebrow}
              slide={slide}
              index={index}
              activeIndex={activeIndex}
              total={heroSlides.length}
            />
          ))}
        </group>
      </Float>
    </>
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
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0.35, 5.2], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Suspense fallback={null}>
        <HeroScene activeIndex={activeIndex} paused={paused} />
      </Suspense>
    </Canvas>
  )
}

export function ThreeJsHero({
  activeIndex,
  onActiveIndexChange,
  className,
}: {
  activeIndex: number
  onActiveIndexChange: (index: number, userInitiated?: boolean) => void
  className?: string
}) {
  const reducedMotion = useReducedMotion()
  const [paused, setPaused] = useState(false)
  const [sceneReady, setSceneReady] = useState(false)

  const slide = useMemo(
    () => heroSlides[activeIndex % heroSlides.length],
    [activeIndex],
  )

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setSceneReady(true))
    return () => window.cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    if (reducedMotion || paused) return
    const id = window.setInterval(() => {
      onActiveIndexChange((activeIndex + 1) % heroSlides.length)
    }, SLIDE_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [activeIndex, onActiveIndexChange, paused, reducedMotion])

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
      className={cn('relative min-h-[min(92vh,860px)] w-full', className)}
      aria-label="Showcase hero carousel"
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
        {reducedMotion ? (
          <div
            className="absolute inset-0 bg-gradient-to-br from-gold-900/20 via-black to-black"
            aria-hidden
          />
        ) : sceneReady ? (
          <ThreeJsHeroCanvas activeIndex={activeIndex} paused={paused} />
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
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div className="mx-auto w-full max-w-screen-xl">
          <HeroSlideCopy
            key={activeIndex}
            slide={slide}
            animate={!reducedMotion}
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
        </div>
      </div>
    </section>
  )
}
