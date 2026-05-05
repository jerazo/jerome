export type ExperienceItem = {
  company: string
  role: string
  location?: string
  start: string
  end: string
  highlights: string[]
}

export const profile = {
  name: 'Jerome Lopez Erazo',
  headline: 'Software Engineer • Tech Lead • AI Enthusiast',
  tagline:
    'I build high-impact web products, scalable platforms, and front-end systems—fast, reliable, and production-ready.',
  location: 'Quezon City, Philippines',
  email: 'monx.erazo@me.com',
  phone: '+63 917 621 7351',
  links: {
    linkedin: 'https://www.linkedin.com/in/jeromeerazo/',
  },
  stats: [
    { label: 'Years building web', value: '20+' },
    { label: 'Largest team led', value: 'Large engineering orgs' },
    { label: 'Focus', value: 'SaaS • Platforms • DX' },
  ],
  summary: [
    'Seasoned full-stack engineer and technical leader with 20+ years of experience delivering and scaling web platforms.',
    'Experienced across frontend, backend, and cloud infrastructure with strong CI/CD and observability practices.',
    'Comfortable as a player-coach: setting standards, mentoring engineers, and aligning delivery with business goals.',
  ],
  servicesPositioning: [
    'Full‑stack product development (React + Node) with maintainable architecture.',
    'Front-end systems: design systems, performance, accessibility, and developer experience.',
    'Technical leadership: planning, estimation, reviews, mentorship, and delivery discipline.',
  ],
  skills: [
    'React',
    'TypeScript',
    'Node.js',
    'API design',
    'Distributed systems',
    'System architecture',
    'CI/CD',
    'Observability',
    'MongoDB',
    'PostgreSQL',
  ],
  experience: [
    {
      company: 'Unicity International, Inc.',
      role: 'Lead Developer (Asia Product Engineering)',
      location: 'Taguig City, Philippines',
      start: 'May 2023',
      end: 'Nov 2025',
      highlights: [
        'Led Asia Product Engineering across Growth, Office, and Shop streams; aligned roadmap execution and cross-team dependencies.',
        'Owned delivery discipline (planning, estimation, releases) while maintaining consistent engineering standards.',
        'Drove hiring, onboarding, and mentorship; improved team throughput and quality via pragmatic process and coaching.',
        'Partnered with product and design to ship experiments and feature launches with measurable user and business impact.',
      ],
    },
    {
      company: 'Tempest House',
      role: 'Full Stack Lead / Senior Software Engineer / UI Developer',
      location: 'Santa Barbara, CA (remote)',
      start: 'Jan 2018',
      end: 'Present',
      highlights: [
        'Led end-to-end delivery across React/TypeScript frontends and Node.js services for multiple client products.',
        'Built and maintained backend services for AKI Movement Laboratory; collaborated with domain teams on data workflows and reliability.',
        'Delivered senior frontend work for Ad-juster, DoubleVerify, and ZippyCash with a focus on performance, accessibility, and UX polish.',
        'Supported recruiting and team leadership: interviewing, mentoring, and unblocking delivery across distributed teams.',
      ],
    },
    {
      company: 'Ryze Software Inc. (Shadow.gg contractor)',
      role: 'Software Engineer / Team Manila Lead',
      location: 'Santa Monica, CA (remote)',
      start: 'Mar 2017',
      end: 'May 2018',
      highlights: [
        'Led a Manila delivery team for Shadow.gg engagements; coordinated scope, estimates, and execution with US stakeholders.',
        'Built the Esportify common API including social login, user identity, and persistent storage for shared services.',
        'Shipped new features and production fixes while improving stability through disciplined testing and incremental refactors.',
      ],
    },
    {
      company: 'PLANET3, Inc.',
      role: 'Web Application Engineer',
      location: 'Washington, DC (remote)',
      start: 'Jun 2016',
      end: 'Jun 2017',
      highlights: [
        'Developed and maintained a web portal using Node.js and MongoDB, delivering features and iterative product improvements.',
        'Assisted backend testing and helped shape data structures and API payloads for reliability and scalability.',
        'Implemented UI functionality and performed cross-browser testing to ensure consistent, production-ready behavior.',
      ],
    },
    {
      company: 'BitRaider, MMO LLC',
      role: 'Software Engineer / Web Developer',
      location: 'Jacksonville, FL (remote)',
      start: 'Feb 2012',
      end: 'Jun 2017',
      highlights: [
        'Implemented UI skins and core site features for bitraider.com and client web properties.',
        'Developed reporting concepts for very large datasets, prioritizing performance and future scalability.',
        'Maintained legacy PHP components and partnered on system design decisions with cross-functional stakeholders.',
      ],
    },
    {
      company: 'Xfire Holding, Inc. (acquired by GGN)',
      role: 'Software Engineer / Web Developer',
      location: 'Los Angeles, CA',
      start: 'Feb 2012',
      end: 'Feb 2017',
      highlights: [
        'Built and maintained API functionality and web features for consumer-facing experiences.',
        'Implemented automated League of Legends tournament flows including brackets and tournament structures.',
        'Modernized legacy JavaScript toward Angular while delivering production fixes and new functionality during acquisition transition.',
      ],
    },
    {
      company: 'Island Logic',
      role: 'Senior Web Developer - Web Department',
      location: 'Makati, Philippines',
      start: 'Mar 2009',
      end: 'Feb 2012',
      highlights: [
        'Delivered and maintained multiple high-traffic gaming and e-commerce sites across PHP/JavaScript and ASP/IIS stacks.',
        'Built internal reporting and statistics tools for management; translated requirements into reliable dashboards and workflows.',
        'Revised and stabilized payment gateway integrations; improved performance through optimization and careful regression testing.',
        'Owned deployment readiness: environment structure, SVN workflows, QA, and live releases across concurrent projects.',
      ],
    },
    {
      company: 'One Global Contact Center',
      role: 'Supervisor - Web Department',
      location: 'Ortigas, Philippines',
      start: 'May 2007',
      end: 'Mar 2009',
      highlights: [
        'Managed a large web production and programming organization, balancing internal delivery and external client work.',
        'Led multiple concurrent campaigns (e.g., USwebsitebuilders.com, Fruitengine.com, Ebusinessweb.net), ensuring quality and on-time delivery.',
        'Owned operational workflows: domain management, scorecards/reporting, cancellations, and documentation across sales and production.',
        'Improved throughput by introducing tooling and lightweight process discipline while remaining hands-on with production work when needed.',
      ],
    },
    {
      company: 'Freelance',
      role: 'Freelance Programmer & Graphic Artist',
      location: 'Quezon City, Philippines',
      start: 'Nov 2005',
      end: 'May 2007',
      highlights: [
        'Delivered marketing sites and campaign assets end-to-end: PHP/MySQL development, UI builds, and graphic design.',
        'Built small-business utilities and reporting tools (VB/VB.NET) and produced operational reports using Crystal Reports.',
        'Provided IT support and troubleshooting across Windows environments supporting day-to-day operations.',
      ],
    },
    {
      company: "Phases 'n Faces",
      role: 'Senior Graphic Artist / IT Consultant / Photographer',
      location: 'Quezon City, Philippines',
      start: '2003',
      end: 'Nov 2005',
      highlights: [
        'Handled photography for events, weddings, and prenup shoots; ensured consistent quality from capture through final edits.',
        'Produced ads and wedding collateral using Photoshop/Corel; maintained visual standards and performed quality control for artists.',
        'Provided Mac/Windows system maintenance and hardware troubleshooting; supported internal R&D initiatives and studio operations.',
      ],
    },
  ] satisfies ExperienceItem[],
} as const
