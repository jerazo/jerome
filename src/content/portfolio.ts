export type PortfolioImage = {
  src: string
  alt: string
  label?: string
}

export type PortfolioImpactMetric = {
  label: string
  value: string
}

export type PortfolioImpactNarrative = {
  problem: string
  solution: string
  result: string
}

export type PortfolioProject = {
  id: string
  title: string
  client: string
  period: string
  summary: string
  tags: string[]
  accent: string
  /** Primary recruiter-facing metric shown on portfolio cards. */
  impactMetric?: PortfolioImpactMetric
  impactMetrics?: PortfolioImpactMetric[]
  /** Recruiter-facing problem → solution → result story for the detail page. */
  impactNarrative?: PortfolioImpactNarrative
  imageSrc?: string
  imageAlt?: string
  images?: PortfolioImage[]
  span?: 'default' | 'full'
  url?: string
}

const aiWorkflowTags = ['Cursor', 'Codex', 'Gemini', 'RAG', 'MCP'] as const

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'thea-studio',
    title: 'Thea Studio',
    client: 'Personal project',
    period: '2026 – Present',
    summary:
      'Browser-based DICOM workspace for reading, AI-assisted segmentation, structured reporting, and surgical planning—with encrypted Thea Cloud collaboration and AWS deployment.',
    tags: [
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
      ...aiWorkflowTags,
    ],
    accent: 'from-sky-500/35 via-indigo-500/20 to-transparent',
    url: 'https://thea.monx.dev/',
    impactMetric: { label: 'Imaging workspace', value: 'View → plan → report' },
    impactMetrics: [
      { label: 'Viewer modes', value: '2D · MPR · 3D' },
      { label: 'AI assist', value: 'In-browser segmentation' },
      { label: 'Cloud', value: 'Encrypted Thea Cloud' },
    ],
    impactNarrative: {
      problem:
        'Clinicians juggled separate tools for DICOM viewing, sharing, reporting, and procedure planning—often locked to desktop installs or hospital-only networks.',
      solution:
        'I built Thea Studio: a web DICOM workspace with Cornerstone3D viewing, AI click-to-segment, structured reports, ablation planning, RBAC, and encrypted cloud collaboration on AWS.',
      result:
        'One browser workspace covers open → analyze → report → plan, with a free local tier and paid cloud collaboration—no desktop install required.',
    },
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
      {
        src: '/portfolio/thea-studio/plans.png',
        alt: 'Thea Studio Glimpse, Panorama, and Horizon subscription plans',
        label: 'Plans',
      },
      {
        src: '/portfolio/thea-studio/admin.png',
        alt: 'Thea Studio super-admin dashboard with growth and subscription metrics',
        label: 'Admin',
      },
      {
        src: '/portfolio/thea-studio/workspace.png',
        alt: 'Thea Studio authenticated viewer shell before opening a study',
        label: 'Workspace',
      },
    ],
  },
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
    impactMetric: { label: 'Distribution', value: '6 platform exports' },
    impactMetrics: [
      { label: 'Platform export', value: '6 channels' },
      { label: 'AI pipeline', value: 'Script → export' },
      { label: 'Production time', value: 'Hours → minutes' },
    ],
    impactNarrative: {
      problem:
        'Creating short-form video for six social platforms meant juggling separate tools for scripting, voiceover, editing, and export.',
      solution:
        'I built an AI-assisted pipeline—from research and scripting through timeline editing, voiceover, and multi-platform export—in one React app.',
      result:
        'Creators ship platform-ready videos from a single workflow, cutting production hops and keeping quality consistent across channels.',
    },
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
      { label: 'Live integrations', value: 'how mind works' },
      { label: 'Query layer', value: 'Natural language' },
      { label: 'Response time', value: 'Sub-second HUD' },
    ],
    impactNarrative: {
      problem:
        'Daily context—weather, calendar, repos, flights, music—lived in disconnected apps with no unified command surface.',
      solution:
        'I built a HUD-style dashboard that aggregates a dozen live feeds with WebSocket updates and an LLM chat layer for natural-language queries.',
      result:
        'One screen replaces tab-hopping for status checks, giving instant situational awareness and faster decisions throughout the day.',
    },
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
    impactMetric: { label: 'Hardware config', value: 'device online configurator' },
    impactMetrics: [
      { label: 'Setup time', value: 'Desktop → browser' },
      { label: 'Hardware config', value: 'device online configurator' },
      { label: 'Phase 2 scale', value: 'Fleet + audit' },
    ],
    impactNarrative: {
      problem:
        'Field teams configuring Seek Thermal devices relied on desktop installs and manual handoffs that slowed rollout and support.',
      solution:
        'I delivered a browser configurator with Web USB, feature toggles, splash uploads, and Phase 2 fleet workspaces with auth and audit logging.',
      result:
        'Technicians configure hardware in the field from one web app—removing install friction and enabling fleet-scale device management.',
    },
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
      { label: 'Release cadence', value: 'Aligned roadmap' },
      { label: 'Leadership', value: 'Asia engineering' },
    ],
    impactNarrative: {
      problem:
        'Growth, Office, and Shop streams across Asia needed aligned roadmaps, release discipline, and consistent engineering standards.',
      solution:
        'I led Asia product engineering—planning, estimation, cross-team delivery, and mentorship—while shipping experiments across three platforms.',
      result:
        'Teams shipped coordinated releases with clearer ownership, faster ramp for new engineers, and measurable progress on business experiments.',
    },
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
      { label: 'Client products', value: 'multiple projects' },
      { label: 'Engagement', value: '7+ years' },
      { label: 'Delivery model', value: 'End-to-end' },
    ],
    impactNarrative: {
      problem:
        'Agency clients needed production-grade React/TypeScript products without sacrificing velocity, accessibility, or long-term maintainability.',
      solution:
        'I led end-to-end delivery across Ad-juster, DoubleVerify, ZippyCash, and other Tempest House engagements—from UI systems through Node.js services.',
      result:
        'Multiple client products shipped and maintained over seven years, with reusable patterns that shortened ramp time on each new engagement.',
    },
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
      { label: 'Payments', value: 'frontend dev (React)' },
      { label: 'Flows shipped', value: 'Transfer + fund' },
      { label: 'Domain', value: 'Consumer fintech' },
    ],
    impactNarrative: {
      problem:
        'Canadian wallet users expected fast transfers, clear transaction history, and trustworthy funding flows in a polished consumer UI.',
      solution:
        'I built frontend flows for ZippyCash covering transfers, transaction history, funding sources, and Interac e-Transfer with accessible, production-ready components.',
      result:
        'Users complete everyday money movement in fewer steps, with UI polish that matches the trust bar fintech demands.',
    },
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
      { label: 'Focus', value: 'Angular expert FE' },
      { label: 'Platform', value: 'Enterprise media' },
      { label: 'Delivery focus', value: 'A11y + perf' },
    ],
    impactNarrative: {
      problem:
        'DoubleVerify’s marketing and product surfaces needed enterprise-grade performance and accessibility without slowing feature delivery.',
      solution:
        'I led senior frontend delivery—optimizing bundle weight, tightening UX polish, and baking accessibility into Angular/Material UI workflows.',
      result:
        'Lighter pages and more inclusive interactions shipped alongside ongoing product work, raising the quality bar for customer-facing surfaces.',
    },
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
      { label: 'Product', value: 'egames pro analytics' },
      { label: 'Shipped feature', value: 'Draft simulator' },
      { label: 'Shared platform', value: 'Esportify API' },
    ],
    impactNarrative: {
      problem:
        'Pro League of Legends teams lacked a fast way to explore draft scenarios, team stats, and player performance in one analytics product.',
      solution:
        'I built Shadow.gg with draft simulation, filterable team and player stats, plus the Esportify API for shared auth and storage across products.',
      result:
        'Analysts and fans explore pro-level data interactively—turning raw match history into draft prep and storytelling tools.',
    },
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
      { label: 'Role', value: 'back office support dev' },
      { label: 'Stack', value: 'Node + MongoDB' },
      { label: 'Domain', value: 'Ed-tech portal' },
    ],
    impactNarrative: {
      problem:
        'Planet3’s explore-play-learn portal needed reliable UI features and API payloads across browsers for students and educators.',
      solution:
        'I developed and maintained the web portal with Node.js and MongoDB—shipping UI features, API integrations, and cross-browser test coverage.',
      result:
        'The education platform stayed stable through iterative releases, supporting interactive learning experiences at scale.',
    },
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
      { label: 'Capture', value: 'Mobile gait analysis' },
      { label: 'Stack', value: 'Ionic + Node.js' },
      { label: 'Collaboration', value: 'Domain team' },
    ],
    impactNarrative: {
      problem:
        'Movement scientists needed field-ready gait capture with backend workflows that kept pace with clinical iteration.',
      solution:
        'I delivered an Ionic/Cordova mobile client and Node.js services, working closely with the domain team on data workflows.',
      result:
        'Clinicians collect and review gait data on mobile with services that support ongoing product experiments.',
    },
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
      { label: 'Automation', value: 'eGames pro Tournament website' },
      { label: 'API coverage', value: 'Consumer web' },
      { label: 'Game focus', value: 'League of Legends' },
    ],
    impactNarrative: {
      problem:
        'Running League of Legends tournaments manually meant brittle brackets, slow updates, and heavy ops overhead for organizers.',
      solution:
        'I automated tournament flows—brackets, structures, and API-backed consumer features—for Xfire and GGN properties.',
      result:
        'Organizers run events with less manual work while players get reliable bracket and match visibility on the web.',
    },
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
      { label: 'Download UX', value: 'Game Streaming delivery' },
      { label: 'UI delivery', value: 'Multi-game skins' },
      { label: 'Catalog scale', value: 'Large datasets' },
    ],
    impactNarrative: {
      problem:
        'BitRaider’s distribution platform needed branded downloader experiences and site features that handled very large game catalogs.',
      solution:
        'I built UI skins and core site features for bitraider.com, including streaming download UX and reporting concepts for massive datasets.',
      result:
        'Players get title-specific launcher experiences while the platform scales catalog and download operations.',
    },
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
      { label: 'Platform', value: 'WP website' },
      { label: 'Audience', value: 'Legal professionals' },
      { label: 'Delivery', value: 'Marketing site' },
    ],
    impactNarrative: {
      problem:
        'Forensworks needed a credible web presence that explained complex digital forensics services to legal professionals.',
      solution:
        'I built the marketing site covering forensics, data recovery, usage tracking, timeline reconstruction, and expert analysis offerings.',
      result:
        'Prospects quickly understand service depth and expertise—supporting lead generation for a specialized forensics firm.',
    },
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
    impactMetric: { label: 'Throughput', value: 'SME website builder' },
    impactMetrics: [
      { label: 'Dev throughput', value: '7× faster' },
      { label: 'Team output', value: '1 page/dev/day' },
      { label: 'Org scale', value: 'Large web team' },
    ],
    impactNarrative: {
      problem:
        'A large web production org was delivering roughly one page per developer per week—too slow for client demand.',
      solution:
        'I managed the production organization and redesigned process, tooling, and handoffs across PHP/jQuery/MySQL delivery.',
      result:
        'Throughput rose to one page per developer per day—a 7× improvement that unlocked capacity without adding headcount.',
    },
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
      { label: 'Product sites', value: 'Game Database and Marketing' },
      { label: 'Concurrent delivery', value: 'Multi-client' },
      { label: 'Stacks', value: 'PHP + ASP/IIS' },
    ],
    impactNarrative: {
      problem:
        'Island Logic’s QuickJump line required a high-volume catalog of gaming, e-commerce, and marketing sites on tight launch schedules.',
      solution:
        'I built and maintained sites across PHP/JavaScript and ASP/IIS stacks, juggling concurrent client launches and shared patterns.',
      result:
        'Ten-plus product sites shipped and stayed maintained—proving repeatable delivery across different stacks and industries.',
    },
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

const portfolioSlugAliases: Record<string, string> = {
  'fire-products-configurator': 'seek-thermal',
  'unicity-platform': 'unicity-asia',
  'doubleverify-platform': 'doubleverify',
}

export function resolvePortfolioSlug(slug: string): string {
  return portfolioSlugAliases[slug] ?? slug
}

export function getPortfolioProject(slug: string): PortfolioProject | undefined {
  const resolved = resolvePortfolioSlug(slug)
  return portfolioProjects.find((project) => project.id === resolved)
}

export function getPortfolioProjectImages(project: PortfolioProject): PortfolioImage[] {
  if (project.images?.length) return project.images
  if (project.imageSrc) {
    return [{ src: project.imageSrc, alt: project.imageAlt ?? project.title }]
  }
  return []
}
