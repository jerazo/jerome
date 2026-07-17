import type { PortfolioImage, PortfolioImpactMetric } from './portfolio'

/**
 * A live, interactive project entry for the showcase gallery.
 *
 * Slugs use lower-case, hyphen-separated words derived from the project title
 * (e.g. `"Fire Products Configurator"` → `"fire-products-configurator"`).
 * Keep slugs stable once published — they may be used in routes and deep links.
 */
export interface ShowcaseItem {
  /** Stable identifier; typically matches the slug. */
  id: string
  /** Display name shown in cards and detail views. */
  title: string
  /**
   * URL-safe path segment for routing and bookmarks.
   * Convention: lower-case, hyphen-separated (kebab-case).
   */
  slug: string
  /** Short recruiter-facing summary of what the project does and why it matters. */
  description: string
  /** Public URL where recruiters can interact with the live site or demo. */
  liveUrl: string
  /** Screenshot gallery for preview thumbnails and modal lightbox. */
  images: PortfolioImage[]
  /** Primary technologies and platforms used to deliver the project. */
  techStack: string[]
  /** Optional outcome metrics that highlight measurable impact. */
  impactMetrics?: PortfolioImpactMetric[]
}

/**
 * Curated live demos for the showcase page.
 * Add new entries here — one object per project, fully populated.
 */
export const showcaseItems: ShowcaseItem[] = [
  {
    id: 'thea-studio',
    title: 'Thea Studio',
    slug: 'thea-studio',
    description:
      'Browser-based DICOM workspace for reading, AI-assisted segmentation, structured reporting, and surgical planning—with encrypted Thea Cloud collaboration and AWS deployment.',
    liveUrl: 'https://thea.monx.dev/',
    techStack: [
      'React',
      'TypeScript',
      'Cornerstone3D',
      'Stencil',
      'Zustand',
      'Hono',
      'AWS',
      'Terraform',
      'ONNX',
      'DICOM',
      'PWA',
    ],
    impactMetrics: [
      { label: 'Viewer modes', value: '2D · MPR · 3D' },
      { label: 'AI assist', value: 'In-browser seg' },
      { label: 'Cloud', value: 'Encrypted storage' },
    ],
    images: [
      {
        src: '/portfolio/thea-studio/viewer.png',
        alt: 'Thea Studio DICOM viewer with sample MRI study and report workspace',
        label: 'DICOM viewer',
      },
      {
        src: '/portfolio/thea-studio/mpr.png',
        alt: 'Thea Studio multi-planar reconstruction axial, sagittal, and coronal views',
        label: 'MPR',
      },
      {
        src: '/portfolio/thea-studio/marketing.png',
        alt: 'Thea Studio marketing site hero with multi-device product mockups',
        label: 'Product site',
      },
    ],
  },
  {
    id: 'fire-products-configurator',
    title: 'Fire Products Configurator',
    slug: 'fire-products-configurator',
    description:
      'Web configurator for Seek Thermal fire products with USB device connection, feature toggles, custom splash screens, and config import/export. Phase 2 adds fleet management, workspace admin, and audit logging.',
    liveUrl: 'https://configurator-test.thermal.com/',
    techStack: [
      'React',
      'TypeScript',
      'Web USB',
      'Cloudflare',
      'AWS Lambda',
      'S3',
      'Cognito',
      'PostgreSQL',
      'i18n',
    ],
    impactMetrics: [
      { label: 'Hardware config', value: 'Web USB' },
      { label: 'Phase 2 scale', value: 'Fleet mgmt' },
    ],
    images: [
      {
        src: '/portfolio/seek-thermal/connect-device.png',
        alt: 'Seek Thermal Fire Products Configurator device connection screen',
        label: 'Connect device',
      },
      {
        src: '/portfolio/seek-thermal/configurator.png',
        alt: 'Seek Thermal Fire Products Configurator settings dashboard',
        label: 'Configurator',
      },
      {
        src: '/portfolio/seek-thermal/fleet-phase-2.png',
        alt: 'Seek Thermal Phase 2 fleet manager device list',
        label: 'Fleet manager',
      },
    ],
  },
  {
    id: 'digital-creator',
    title: 'Digital Creator',
    slug: 'digital-creator',
    description:
      'AI-assisted video creation platform for social channels — from research and scripting through timeline editing, voiceover, and multi-platform export for Facebook, Instagram, YouTube, TikTok, and more.',
    liveUrl: 'https://digital-creator.monx.dev/',
    techStack: [
      'React',
      'TypeScript',
      'AI',
      'Video production',
      'Local LLM',
      'Ollama',
      'RAG',
      'MCP',
    ],
    impactMetrics: [
      { label: 'Platform export', value: '6 channels' },
      { label: 'AI pipeline', value: 'Script → export' },
    ],
    images: [
      {
        src: '/portfolio/digital-creator/projects.png',
        alt: 'Digital Creator project library and video list',
        label: 'Projects',
      },
      {
        src: '/portfolio/digital-creator/video-editor.png',
        alt: 'Digital Creator long-form video editor with timeline',
        label: 'Video editor',
      },
      {
        src: '/portfolio/digital-creator/script-editor-ai.png',
        alt: 'Digital Creator AI script editor with voiceover rendering',
        label: 'Script & voiceover',
      },
    ],
  },
  {
    id: 'jarvis',
    title: 'J.A.R.V.I.S.',
    slug: 'jarvis',
    description:
      'Personal HUD-style command center that pulls weather, calendar, GitHub activity, flight data, and music into one screen, with an LLM chat layer for natural-language queries and live system status.',
    liveUrl: 'https://jarvis.monx.dev/',
    techStack: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Vite',
      'Three.js',
      'Fastify',
      'WebSocket',
      'Ollama',
      'RAG',
    ],
    impactMetrics: [
      { label: 'Live integrations', value: '12+ feeds' },
      { label: 'Query layer', value: 'Natural language' },
    ],
    images: [
      {
        src: '/portfolio/jarvis/dashboard.png',
        alt: 'J.A.R.V.I.S. dashboard with weather, calendar, GitHub, flight data, and LLM chat',
        label: 'Command center',
      },
      {
        src: '/portfolio/jarvis/music-player.png',
        alt: 'J.A.R.V.I.S. Spotify music player with voice visualization and LLM chat',
        label: 'Music player',
      },
    ],
  },
  {
    id: 'unicity-platform',
    title: 'Unicity Platform',
    slug: 'unicity-platform',
    description:
      'Asia product engineering across Growth, Office, and Shop streams — roadmap alignment, release discipline, and cross-team delivery for Unicity’s health and wellness commerce platform.',
    liveUrl: 'https://www.unicity.com/',
    techStack: [
      'React',
      'Node.js',
      'AWS Lambda',
      'S3',
      'Cloudflare',
      'Zero Trust',
      'i18n',
      'Python',
      'GitHub Actions',
    ],
    impactMetrics: [
      { label: 'Product streams', value: '3 platforms' },
      { label: 'Leadership', value: 'Asia engineering' },
    ],
    images: [
      {
        src: '/portfolio/unicity/unicity-com.png',
        alt: 'Unicity.com health and wellness homepage',
        label: 'Unicity.com',
      },
      {
        src: '/portfolio/unicity/shop.png',
        alt: 'Unicity Shop e-commerce storefront',
        label: 'Unicity Shop',
      },
      {
        src: '/portfolio/unicity/office.png',
        alt: 'Unicity Office distributor login',
        label: 'Unicity Office',
      },
    ],
  },
  {
    id: 'doubleverify-platform',
    title: 'DoubleVerify Marketing Platform',
    slug: 'doubleverify-platform',
    description:
      'Senior frontend delivery for DoubleVerify’s media effectiveness platform, focused on performance, accessibility, and UX polish across marketing and product surfaces.',
    liveUrl: 'https://doubleverify.com/',
    techStack: ['Angular', 'TypeScript', 'Material UI', 'Redux', 'GitHub Actions', 'Accessibility'],
    impactMetrics: [
      { label: 'Platform', value: 'Enterprise media' },
      { label: 'Delivery focus', value: 'A11y + perf' },
    ],
    images: [
      {
        src: '/portfolio/doubleverify.png',
        alt: 'DoubleVerify media effectiveness platform homepage',
        label: 'Homepage',
      },
    ],
  },
]
