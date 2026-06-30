import type { CanvasProps } from '@react-three/fiber'

export const SLIDE_INTERVAL_MS = 7000
export const CAROUSEL_RADIUS = 3.2

export const HERO_FALLBACK_IMAGE = '/jerome-portrait-hero-background.webp'
export const HERO_FALLBACK_SUBJECT = '/jerome-portrait-hero-subject.webp'

export const threeHeroCanvasProps: Pick<CanvasProps, 'camera' | 'dpr' | 'gl'> = {
  camera: { position: [0, 0.35, 5.2], fov: 42 },
  dpr: [1, 1.75],
  gl: { antialias: true, alpha: true, powerPreference: 'high-performance' },
}

let webglSupported: boolean | null = null

export function detectWebGLSupport() {
  if (webglSupported != null) return webglSupported

  if (typeof window === 'undefined') {
    webglSupported = false
    return webglSupported
  }

  try {
    const canvas = document.createElement('canvas')
    const context =
      canvas.getContext('webgl2') ??
      canvas.getContext('webgl') ??
      canvas.getContext('experimental-webgl')
    webglSupported = Boolean(context)
  } catch {
    webglSupported = false
  }

  return webglSupported
}

export function slideAngle(index: number, activeIndex: number, total: number) {
  const offset = index - activeIndex
  const wrapped =
    offset > total / 2 ? offset - total : offset < -total / 2 ? offset + total : offset
  return wrapped * 0.72
}
