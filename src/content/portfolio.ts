export type PortfolioImage = {
  src: string
  alt: string
  label?: string
}

export type PortfolioImpactMetric = {
  label: string
  value: string
}

export type PortfolioProject = {
  id: string
  title: string
  client: string
  period: string
  summary: string
  tags: string[]
  accent: string
  impactMetrics?: PortfolioImpactMetric[]
  imageSrc?: string
  imageAlt?: string
  images?: PortfolioImage[]
  span?: 'default' | 'full'
  url?: string
}

const aiWorkflowTags = ['Cursor', 'Codex', 'Gemini', 'RAG', 'MCP'] as const

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'digital-creator',
    title: 'Digital Creator',
    client: 'Personal project',
    period: '2026 – Present',
    summary:
      'AI-assisted video creation for social platforms, from research and scripting through timeline editing, voiceover, and export for Facebook, Instagram, YouTube, TikTok, and more.',
    tags: [
      'React',
      'TypeScript',
      'AI',
      'Video production',
      'Local LLM',
      'Ollama Gemma',
      'ChatGPT',
      'Pollinations',
      ...aiWorkflowTags,
    ],
    accent: 'from-fuchsia-500/35 via-violet-500/20 to-transparent',
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
      {
        src: '/portfolio/digital-creator/video-editor-ai.png',
        alt: 'Digital Creator AI image and video generation tools',
        label: 'AI generation',
      },
      {
        src: '/portfolio/digital-creator/suno-portrait-list.png',
        alt: 'Digital Creator Suno portrait video catalog',
        label: 'Portrait videos',
      },
      {
        src: '/portfolio/digital-creator/suno-portrait-editor.png',
        alt: 'Digital Creator Suno portrait video composition editor',
        label: 'Portrait editor',
      },
      {
        src: '/portfolio/digital-creator/registration.png',
        alt: 'Digital Creator account registration screen',
        label: 'Sign up',
      },
    ],
  },
  {
    id: 'jarvis',
    title: 'J.A.R.V.I.S.',
    client: 'Personal project',
    period: '2026 – Present',
    summary:
      'A personal HUD-style command center that pulls weather, calendar, GitHub activity, flight data, and music into one screen, with an LLM chat layer for natural-language queries and live system status.',
    tags: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Vite',
      'Three.js',
      'Fastify',
      'WebSocket',
      'Ollama',
      'RAG',
      'OpenSky',
      'GitHub API',
      'Google Calendar',
      'OpenWeather',
      'Spotify',
      'Apple Music',
    ],
    accent: 'from-cyan-500/35 via-sky-500/20 to-transparent',
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
    id: 'seek-thermal',
    title: 'Fire Products Configurator',
    client: 'Seek Thermal · Tempest House',
    period: '2026',
    summary:
      'Web configurator for Seek Thermal fire products, including USB device connection, feature toggles, custom splash screens, and config import/export. Phase 2 adds fleet management, auth, workspace admin, and audit logging.',
    tags: [
      'React',
      'TypeScript',
      'Web USB',
      'Hardware',
      'Cloudflare',
      'Codex',
      'AWS',
      'Lambda',
      'S3',
      'i18n Translation',
      'Cognito',
      'PostgreSQL',
    ],
    accent: 'from-red-500/35 via-orange-500/20 to-transparent',
    url: 'https://configurator-test.thermal.com/',
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
        src: '/portfolio/seek-thermal/splash-screen-upload.png',
        alt: 'Seek Thermal custom splash screen image uploader',
        label: 'Splash screen upload',
      },
      {
        src: '/portfolio/seek-thermal/login-phase-2.png',
        alt: 'Seek Thermal Phase 2 secure sign-in screen',
        label: 'Sign in · Phase 2',
      },
      {
        src: '/portfolio/seek-thermal/register-phase-2.png',
        alt: 'Seek Thermal Phase 2 department account registration',
        label: 'Register · Phase 2',
      },
      {
        src: '/portfolio/seek-thermal/fleet-phase-2.png',
        alt: 'Seek Thermal Phase 2 fleet manager device list',
        label: 'Fleet manager · Phase 2',
      },
      {
        src: '/portfolio/seek-thermal/configurator-phase-2.png',
        alt: 'Seek Thermal Phase 2 device configurator with audit log',
        label: 'Device configurator · Phase 2',
      },
      {
        src: '/portfolio/seek-thermal/splash-upload-phase-2.png',
        alt: 'Seek Thermal Phase 2 custom splash screen upload modal',
        label: 'Splash upload · Phase 2',
      },
      {
        src: '/portfolio/seek-thermal/admin-phase-2.png',
        alt: 'Seek Thermal Phase 2 workspace administration settings',
        label: 'Workspace admin · Phase 2',
      },
    ],
  },
  {
    id: 'unicity-asia',
    title: 'Asia product engineering',
    client: 'Unicity International',
    period: '2023 – 2025',
    summary:
      'Led Growth, Office, and Shop streams across Asia product engineering, with roadmap alignment, release discipline, and cross-team delivery.',
    tags: [
      'React',
      'Node.js',
      'Leadership',
      'SaaS',
      'AWS',
      'Lambda',
      'S3',
      'Cloudflare',
      'Zero Trust',
      'i18n Translation',
      'Python',
      'ClickUp',
      'n8n',
      'Travis CI',
      'GitHub Actions',
      ...aiWorkflowTags,
    ],
    accent: 'from-violet-500/35 via-fuchsia-500/20 to-transparent',
    url: 'https://www.unicity.com/',
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
    id: 'tempest-clients',
    title: 'Multi-client product delivery',
    client: 'Tempest House',
    period: '2018 – Present',
    summary:
      'End-to-end React/TypeScript and Node.js delivery for Ad-juster, DoubleVerify, ZippyCash, and other client products.',
    tags: [
      'React',
      'TypeScript',
      'Node.js',
      'UI engineering',
      'PWA',
      'AWS',
      'Lambda',
      'S3',
      'i18n Translation',
      'Cognito',
      'PostgreSQL',
      'Redux',
      'Material UI',
      'Tailwind',
      ...aiWorkflowTags,
    ],
    accent: 'from-sky-500/35 via-cyan-500/20 to-transparent',
    url: 'https://www.tempest.house/',
    impactMetrics: [
      { label: 'Client products', value: '4+ shipped' },
      { label: 'Engagement', value: '7+ years' },
    ],
    imageSrc: '/portfolio/tempest-house.png',
    imageAlt: 'Tempest House agency website homepage',
  },
  {
    id: 'zippycash',
    title: 'ZippyCash wallet platform',
    client: 'ZippyCash · Tempest House',
    period: '2018 – Present',
    summary:
      'Frontend work on ZippyCash, a Canadian fintech wallet covering transfers, transaction history, funding sources, and Interac e-Transfer flows with a polished consumer UI.',
    tags: ['React', 'TypeScript', 'Fintech', 'UI engineering', 'PostgreSQL'],
    accent: 'from-orange-500/35 via-pink-500/20 to-transparent',
    impactMetrics: [
      { label: 'Payments', value: 'Interac e-Transfer' },
      { label: 'Domain', value: 'Consumer fintech' },
    ],
    imageSrc: '/portfolio/zippycash.png',
    imageAlt: 'ZippyCash wallet transfer completed screen',
  },
  {
    id: 'doubleverify',
    title: 'DoubleVerify marketing platform',
    client: 'DoubleVerify · Tempest House',
    period: '2018 – Present',
    summary:
      'Senior frontend delivery for DoubleVerify’s media effectiveness platform, focused on performance, accessibility, and UX polish across marketing and product surfaces.',
    tags: ['Angular', 'TypeScript', 'Material UI', 'Redux', 'GitHub Actions', 'UI engineering', 'Accessibility'],
    accent: 'from-fuchsia-500/35 via-cyan-500/20 to-transparent',
    url: 'https://doubleverify.com/',
    impactMetrics: [
      { label: 'Platform', value: 'Enterprise media' },
      { label: 'Delivery focus', value: 'A11y + perf' },
    ],
    imageSrc: '/portfolio/doubleverify.png',
    imageAlt: 'DoubleVerify media effectiveness platform homepage',
  },
  {
    id: 'shadow-gg',
    title: 'Shadow.gg analytics platform',
    client: 'Ryze Software / Shadow.gg',
    period: '2017 – 2018',
    summary:
      'Built Shadow.gg esports analytics for pro League of Legends, including draft simulation, team and player stats, and filterable data sets. Also delivered the Esportify common API for shared auth and storage.',
    tags: [
      'React',
      'TypeScript',
      'PostgreSQL',
      'Node.js',
      'PHP',
      'Laravel',
      'Lumen',
      'Redux',
      'GitHub Actions',
      'Esports',
      'Analytics',
      'API design',
    ],
    accent: 'from-emerald-500/35 via-teal-500/20 to-transparent',
    impactMetrics: [
      { label: 'Esports data', value: 'Pro LoL stats' },
      { label: 'Shipped feature', value: 'Draft simulator' },
    ],
    images: [
      {
        src: '/portfolio/shadow-gg/draft-simulator.png',
        alt: 'Shadow.gg draft pick and ban simulator',
        label: 'Draft simulator',
      },
      {
        src: '/portfolio/shadow-gg/team-stats.png',
        alt: 'Shadow.gg team statistics and data filters',
        label: 'Team stats',
      },
      {
        src: '/portfolio/shadow-gg/player-stats-doublelift.png',
        alt: 'Shadow.gg Doublelift player statistics page',
        label: 'Player stats',
      },
      {
        src: '/portfolio/shadow-gg/player-profile-wildturtle.png',
        alt: 'Shadow.gg WildTurtle player profile page',
        label: 'Player profile',
      },
    ],
  },
  {
    id: 'planet3',
    title: 'Planet3 web portal',
    client: 'PLANET3, Inc.',
    period: '2016 – 2017',
    summary:
      'Developed and maintained the Planet3 web portal with Node.js and MongoDB, shipping UI features, API payloads, and cross-browser testing for an explore-play-learn education platform.',
    tags: ['React', 'Node.js', 'MongoDB', 'Web development', 'Education'],
    accent: 'from-lime-500/35 via-emerald-500/20 to-transparent',
    url: 'https://www.exploreplanet3.com/',
    impactMetrics: [
      { label: 'Stack', value: 'Node + MongoDB' },
      { label: 'Domain', value: 'Ed-tech portal' },
    ],
    imageSrc: '/portfolio/planet3.png',
    imageAlt: 'Planet3 explore play learn website homepage',
  },
  {
    id: 'aki-movement',
    title: 'Movement lab platform',
    client: 'AKI Movement Laboratory',
    period: 'Tempest House engagement',
    summary:
      'Mobile gait analysis app and backend services for a movement-science product, with an Ionic/Cordova client, data workflows, and close collaboration with the domain team.',
    tags: ['Ionic', 'Cordova', 'Angular', 'Node.js', 'MongoDB', 'Data workflows', 'Backend'],
    accent: 'from-amber-500/35 via-orange-500/20 to-transparent',
    impactMetrics: [
      { label: 'Product', value: 'Gait analysis app' },
      { label: 'Stack', value: 'Ionic + Node.js' },
    ],
    imageSrc: '/portfolio/aki-movement.png',
    imageAlt: 'AKI Movement Laboratory walking gait analysis mobile app',
  },
  {
    id: 'xfire-tournaments',
    title: 'Tournament automation',
    client: 'Xfire / GGN',
    period: '2012 – 2017',
    summary:
      'Automated League of Legends tournament flows with brackets, structures, and API-backed consumer web features.',
    tags: ['JavaScript', 'PHP', 'jQuery', 'Laravel', 'API', 'Gaming'],
    accent: 'from-rose-500/35 via-pink-500/20 to-transparent',
    impactMetrics: [
      { label: 'Automation', value: 'Tournament brackets' },
      { label: 'Game focus', value: 'League of Legends' },
    ],
    imageSrc: '/portfolio/xfire.png',
    imageAlt: 'Xfire Battlefield 3 tournament page',
  },
  {
    id: 'bitraider',
    title: 'BitRaider digital distribution',
    client: 'BitRaider, MMO LLC',
    period: '2012 – 2017',
    summary:
      'UI skins and core site features for bitraider.com, a digital game distribution platform with streaming download tech, plus reporting concepts for very large datasets.',
    tags: ['PHP', 'WordPress', 'Web development', 'Gaming', 'Digital distribution'],
    accent: 'from-orange-500/35 via-indigo-500/20 to-transparent',
    impactMetrics: [
      { label: 'Distribution', value: 'Streaming downloads' },
      { label: 'UI delivery', value: 'Multi-game skins' },
    ],
    images: [
      {
        src: '/portfolio/bitraider.png',
        alt: 'BitRaider digital distribution website homepage',
        label: 'BitRaider.com',
      },
      {
        src: '/portfolio/bitraider-skins-ui.png',
        alt: 'BitRaider downloader UI skin states and launcher design',
        label: 'Downloader UI skins',
      },
      {
        src: '/portfolio/bitraider-skins-games.png',
        alt: 'BitRaider launcher skins for World of Tanks, EVE Online, and other titles',
        label: 'Game launcher skins',
      },
    ],
  },
  {
    id: 'forensworks',
    title: 'Forensworks corporate site',
    client: 'Forensworks · BitRaider sister company',
    period: '2012 – 2017',
    summary:
      'Built the marketing site for Forensworks, an IT forensics firm serving legal professionals, covering digital forensics, data recovery, usage tracking, timeline reconstruction, and expert analysis.',
    tags: ['PHP', 'WordPress', 'Web development', 'Digital forensics', 'Legal tech'],
    accent: 'from-blue-500/35 via-slate-500/20 to-transparent',
    impactMetrics: [
      { label: 'Domain', value: 'Legal forensics' },
      { label: 'Delivery', value: 'Marketing site' },
    ],
    imageSrc: '/portfolio/forensworks.png',
    imageAlt: 'Forensworks digital forensics website homepage',
  },
  {
    id: 'oneglobal-scale',
    title: 'Web production at scale',
    client: 'One Global Contact Center',
    period: '2007 – 2009',
    summary:
      'Managed a large web production org and raised throughput from one page per developer per week to one per day.',
    tags: ['Leadership', 'Process', 'Delivery', 'PHP', 'jQuery', 'MySQL'],
    accent: 'from-indigo-500/35 via-purple-500/20 to-transparent',
    impactMetrics: [
      { label: 'Dev throughput', value: '7× faster' },
      { label: 'Team output', value: '1 page/dev/day' },
    ],
    imageSrc: '/portfolio/oneglobal-uswebsitebuilder.png',
    imageAlt: 'USWebsitebuilder.com homepage built under One Global Contact Center',
  },
  {
    id: 'island-logic-quickjump',
    title: 'QuickJump product portfolio',
    client: 'Island Logic',
    period: '2009 – 2012',
    summary:
      'Built and maintained a high-volume catalog of gaming, e-commerce, education, and marketing sites under Island Logic’s QuickJump line, using PHP/JavaScript and ASP/IIS stacks across concurrent client launches.',
    tags: ['PHP', 'JavaScript', 'Lua', 'C++', 'MySQL', 'MSSQL', 'Gaming', 'E-commerce'],
    accent: 'from-teal-500/35 via-cyan-500/20 to-transparent',
    impactMetrics: [
      { label: 'Product sites', value: '10+ launches' },
      { label: 'Stacks', value: 'PHP + ASP/IIS' },
    ],
    images: [
      {
        src: '/portfolio/island-logic/couponfinder.png',
        alt: 'CouponFinder deals and coupons website',
        label: 'CouponFinder',
      },
      {
        src: '/portfolio/island-logic/eduperfect.png',
        alt: 'Eduperfect online education website',
        label: 'Eduperfect',
      },
      {
        src: '/portfolio/island-logic/premium-brands.png',
        alt: 'Premium Brands digital marketing website',
        label: 'Premium Brands',
      },
      {
        src: '/portfolio/island-logic/bidcandy.png',
        alt: 'BidCandy penny auction website',
        label: 'BidCandy',
      },
      {
        src: '/portfolio/island-logic/pristine-labs.png',
        alt: 'Pristine Labs web promotion website',
        label: 'Pristine Labs',
      },
      {
        src: '/portfolio/island-logic/mmog.png',
        alt: 'MMOG internet marketing website',
        label: 'MMOG',
      },
      {
        src: '/portfolio/island-logic/pnd.png',
        alt: 'PnD Hong Kong digital marketing website',
        label: 'PnD',
      },
      {
        src: '/portfolio/island-logic/abroadsoftware.png',
        alt: 'AbroadSoftware software and web marketing website',
        label: 'AbroadSoftware',
      },
      {
        src: '/portfolio/island-logic/local-fancy.png',
        alt: 'Local Fancy local business directory website',
        label: 'Local Fancy',
      },
      {
        src: '/portfolio/island-logic/yellowgremlin-ffxiv.png',
        alt: 'YellowGremlin Final Fantasy XIV item database',
        label: 'YellowGremlin · FFXIV',
      },
    ],
  },
]
