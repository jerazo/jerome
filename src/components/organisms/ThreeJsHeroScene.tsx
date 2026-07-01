import { Suspense, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { DoubleSide } from 'three'
import { Float, useTexture } from '@react-three/drei'
import { animated, useSpring } from '@react-spring/three'
import type { Group, PerspectiveCamera } from 'three'
import { heroSlides } from '../../content/homeSections'
import { CAROUSEL_RADIUS, slideAngle } from '../../lib/threeSetup'

const AnimatedGroup = animated.group

const HERO_PANEL_TEXTURE =
  'data:image/svg+xml;base64,' +
  btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="160" viewBox="0 0 256 160">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1a1a1a"/>
          <stop offset="100%" stop-color="#0b0b0b"/>
        </linearGradient>
      </defs>
      <rect width="256" height="160" fill="url(#g)"/>
      <path d="M0 120 Q128 80 256 120" stroke="rgba(202,138,4,0.18)" fill="none" stroke-width="2"/>
    </svg>`,
  )

function ParallaxBackdrop({ paused }: { paused: boolean }) {
  const backRef = useRef<Group>(null)
  const midRef = useRef<Group>(null)

  useFrame((state) => {
    if (paused) return
    const t = state.clock.getElapsedTime()
    if (backRef.current) {
      backRef.current.position.x = Math.sin(t * 0.12) * 0.35
      backRef.current.position.y = Math.cos(t * 0.1) * 0.18 - 0.4
    }
    if (midRef.current) {
      midRef.current.position.x = Math.sin(t * 0.22 + 1.2) * 0.22
      midRef.current.position.y = Math.sin(t * 0.16) * 0.12 - 0.15
    }
  })

  return (
    <>
      <group ref={backRef} position={[0, -0.4, -4.8]}>
        <mesh rotation={[-0.15, 0.08, 0]}>
          <planeGeometry args={[14, 8]} />
          <meshBasicMaterial color="#0a0a0a" transparent opacity={0.85} />
        </mesh>
        <mesh position={[0, 0, 0.02]} rotation={[-0.15, 0.08, 0]}>
          <planeGeometry args={[14, 8]} />
          <meshBasicMaterial color="#ca8a04" transparent opacity={0.04} />
        </mesh>
      </group>
      <group ref={midRef} position={[0, -0.15, -3.6]}>
        <mesh rotation={[-0.08, -0.12, 0]}>
          <planeGeometry args={[9, 5.5]} />
          <meshBasicMaterial color="#121212" transparent opacity={0.55} />
        </mesh>
      </group>
    </>
  )
}

function SlidePanelTexture({ isActive }: { isActive: boolean }) {
  const texture = useTexture(HERO_PANEL_TEXTURE)

  return (
    <mesh position={[0, 0, 0.042]}>
      <planeGeometry args={[2.15, 1.28]} />
      <meshStandardMaterial
        map={texture}
        color={isActive ? '#fbbf24' : '#888888'}
        emissive={isActive ? '#ca8a04' : '#000000'}
        emissiveIntensity={isActive ? 0.22 : 0}
        metalness={0.35}
        roughness={0.62}
        transparent
        opacity={isActive ? 0.92 : 0.45}
        side={DoubleSide}
      />
    </mesh>
  )
}

function HeroSlidePanel({
  index,
  activeIndex,
  total,
}: {
  index: number
  activeIndex: number
  total: number
}) {
  const isActive = index === activeIndex
  const angle = slideAngle(index, activeIndex, total)

  const spring = useSpring({
    posX: Math.sin(angle) * CAROUSEL_RADIUS,
    posY: isActive ? 0.18 : -0.06,
    posZ: Math.cos(angle) * CAROUSEL_RADIUS - 2.35,
    rotY: -angle + Math.PI,
    scale: isActive ? 1.1 : 0.78,
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
        <planeGeometry args={[2.35, 1.45]} />
        <meshStandardMaterial
          color={isActive ? '#ca8a04' : '#141414'}
          emissive={isActive ? '#ca8a04' : '#000000'}
          emissiveIntensity={isActive ? 0.42 : 0}
          metalness={0.58}
          roughness={0.32}
          side={DoubleSide}
        />
      </mesh>
      <Suspense fallback={null}>
        <SlidePanelTexture isActive={isActive} />
      </Suspense>
      {isActive ? (
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[2.28, 1.38]} />
          <meshBasicMaterial color="#ca8a04" transparent opacity={0.08} />
        </mesh>
      ) : null}
      <mesh position={[0, 0, -0.01]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[2.2, 1.3]} />
        <meshStandardMaterial color="#070707" metalness={0.15} roughness={0.9} side={DoubleSide} />
      </mesh>
    </AnimatedGroup>
  )
}

function CarouselRig({
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
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
      <group ref={rigRef}>
        {heroSlides.map((slide, index) => (
          <HeroSlidePanel
            key={slide.eyebrow}
            index={index}
            activeIndex={activeIndex}
            total={heroSlides.length}
          />
        ))}
      </group>
    </Float>
  )
}

function HeroCameraRig({
  activeIndex,
  paused,
}: {
  activeIndex: number
  paused: boolean
}) {
  useFrame((state) => {
    if (paused) return
    const camera = state.camera as PerspectiveCamera
    const t = state.clock.getElapsedTime()
    const orbitX = Math.sin(t * 0.14) * 0.12
    const orbitY = 0.35 + Math.sin(t * 0.2) * 0.06
    const slideOffset = slideAngle(activeIndex, activeIndex, heroSlides.length)
    const targetX = Math.sin(slideOffset) * 0.35 + orbitX
    const targetZ = 5.2 + Math.cos(slideOffset) * 0.35

    camera.position.x += (targetX - camera.position.x) * 0.04
    camera.position.y += (orbitY - camera.position.y) * 0.04
    camera.position.z += (targetZ - camera.position.z) * 0.04
    camera.lookAt(targetX * 0.4, 0.05, -1.8)
  })

  return null
}

export function ThreeJsHeroScene({
  activeIndex,
  paused,
}: {
  activeIndex: number
  paused: boolean
}) {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 3]} intensity={1.1} color="#fff7ed" />
      <pointLight position={[-3, 2, 2]} intensity={0.65} color="#ca8a04" />
      <pointLight position={[2.5, -1, 3]} intensity={0.35} color="#8B5CF6" />
      <ParallaxBackdrop paused={paused} />
      <HeroCameraRig activeIndex={activeIndex} paused={paused} />
      <CarouselRig activeIndex={activeIndex} paused={paused} />
    </>
  )
}
