import { parseSkillYears } from '../lib/skillLevel'

export type SkillItem = {
  name: string
  experience: string
}

export type SkillCategory = {
  label: string
  items: SkillItem[]
}

export type SkillHighlightTier = 'primary' | 'featured' | 'default'

export const arsenalCategoryOrder = [
  'Cloud + DevOps',
  'Front end',
  'Delivery',
  'Platforms',
  'Languages',
  'AI tooling',
  'Back end',
  'Data',
  'Engineering practice',
] as const

export function getTechStackCategoriesInDisplayOrder() {
  return arsenalCategoryOrder
    .map((label) => techStack.find((category) => category.label === label))
    .filter((category): category is SkillCategory => category != null)
}

export type SkillWithCategory = SkillItem & {
  category: string
}

const nodeEcosystemSkills = new Set(['JavaScript', 'TypeScript', 'Next.js', 'React'])

const excludedSkillNames = new Set(['Nginx', 'Apache', 'IIS'])

const featuredSkillNames = new Set([
  'GitHub Actions',
  'Travis CI',
  'Mixpanel',
  'Vite',
  'React Native',
  'JIRA',
  'Jenkins',
  'Android',
  'iOS',
  'Google Analytics',
  'macOS',
  'Angular',
  'Git',
  'LaunchDarkly',
  'CI/CD',
  'GitLab CI',
])

/** Core tier: MERN, data, AI, AWS, delivery, and leadership focus. */
const primarySkillNames = new Set([
  'JavaScript',
  'TypeScript',
  'React',
  'React Native',
  'Angular',
  'Vite',
  'Node.js',
  'Express',
  'MongoDB',
  'PostgreSQL',
  'MySQL',
  'Supabase',
  'DynamoDB',
  'AWS',
  'Lambda / Cloud Functions',
  'EventBridge',
  'Amazon Cognito',
  'CloudFormation',
  'CloudFront',
  'API Gateway',
  'Serverless architecture',
  'Git',
  'CI/CD',
  'GitHub Actions',
  'LaunchDarkly',
  'Google Analytics',
  'Mixpanel',
  'OpenAI API',
  'LLM-assisted dev (ChatGPT)',
  'Claude',
  'Cursor',
  'Prompt Engineering',
  'RAG (Retrieval-Augmented Generation)',
  'MCP (Model Context Protocol)',
  'Software engineering',
  'Full-stack development',
  'Software architecture',
  'System design',
  'Team leadership',
  'Technical leadership',
  'Engineering management',
])

const tierWeight: Record<SkillHighlightTier, number> = {
  primary: 2,
  featured: 1,
  default: 0,
}

export function getSkillHighlightTier(skill: SkillWithCategory): SkillHighlightTier {
  if (primarySkillNames.has(skill.name)) return 'primary'
  if (isFeaturedAboutSkill(skill)) return 'featured'
  return 'default'
}

export function isFeaturedAboutSkill(skill: SkillWithCategory): boolean {
  if (excludedSkillNames.has(skill.name)) return false
  if (primarySkillNames.has(skill.name)) return false

  if (skill.category === 'Data' || skill.category === 'AI tooling') return true
  if (skill.category === 'Cloud + DevOps') return true
  if (skill.category === 'Back end') return true
  if (skill.category === 'Engineering practice') return true
  if (featuredSkillNames.has(skill.name)) return true
  if (nodeEcosystemSkills.has(skill.name)) return true
  return false
}

export function getAllTechStackSkillsWithCategory(): SkillWithCategory[] {
  return techStack.flatMap((category) =>
    category.items.map((item) => ({ ...item, category: category.label })),
  )
}

export function getAboutSectionSkills(): SkillWithCategory[] {
  return getAllTechStackSkillsWithCategory().sort((a, b) => {
    const tierDelta = tierWeight[getSkillHighlightTier(b)] - tierWeight[getSkillHighlightTier(a)]
    if (tierDelta !== 0) return tierDelta
    return parseSkillYears(b.experience) - parseSkillYears(a.experience)
  })
}

export function getAllTechStackSkills(): SkillItem[] {
  return techStack
    .flatMap((category) => category.items)
    .sort((a, b) => parseSkillYears(b.experience) - parseSkillYears(a.experience))
}

export const techStack: SkillCategory[] = [
  {
    label: 'Languages',
    items: [
      { name: 'TypeScript', experience: '~8 yrs' },
      { name: 'JavaScript', experience: '17+ yrs' },
      { name: 'PHP', experience: '15+ yrs' },
      { name: 'Python', experience: '14+ yrs' },
      { name: 'C++', experience: '5+ yrs' },
    ],
  },
  {
    label: 'Front end',
    items: [
      { name: 'React', experience: '~8 yrs' },
      { name: 'React Native', experience: '~6 yrs' },
      { name: 'Next.js', experience: '~6 yrs' },
      { name: 'Angular', experience: '10 yrs' },
      { name: 'Vite', experience: '~4 yrs' },
      { name: 'Ionic/Cordova', experience: '~8 yrs' },
      { name: 'jQuery', experience: '17 yrs' },
    ],
  },
  {
    label: 'Back end',
    items: [
      { name: 'Node.js', experience: '~10 yrs' },
      { name: 'Express', experience: '~10 yrs' },
      { name: 'API design', experience: '15+ yrs' },
      { name: 'API Gateway', experience: '~5 yrs' },
      { name: 'Laravel', experience: '~8 yrs' },
      { name: 'Zend', experience: '8 yrs' },
    ],
  },
  {
    label: 'Data',
    items: [
      { name: 'MySQL', experience: '17 yrs' },
      { name: 'PostgreSQL', experience: '10+ yrs' },
      { name: 'MongoDB', experience: '9+ yrs' },
      { name: 'DynamoDB', experience: '~5 yrs' },
      { name: 'Supabase', experience: '2+ yrs' },
      { name: 'MS SQL', experience: '5+ yrs' },
    ],
  },
  {
    label: 'Cloud + DevOps',
    items: [
      { name: 'AWS', experience: '~6 yrs' },
      { name: 'GCP', experience: '5 yrs' },
      { name: 'Azure', experience: '3 yrs' },
      { name: 'Lambda / Cloud Functions', experience: '3+ yrs' },
      { name: 'EventBridge', experience: '~3 yrs' },
      { name: 'Amazon Cognito', experience: '~4 yrs' },
      { name: 'CloudFormation', experience: '~4 yrs' },
      { name: 'Serverless architecture', experience: '8+ yrs' },
      { name: 'Cloud architecture', experience: '12+ yrs' },
      { name: 'Infrastructure as Code (IaC)', experience: '~8 yrs' },
      { name: 'Terraform', experience: '~4 yrs' },
      { name: 'DevOps', experience: '12+ yrs' },
      { name: 'Platform Engineering', experience: '~10 yrs' },
      { name: 'Site Reliability Engineering (SRE)', experience: '~8 yrs' },
      { name: 'Cloud Security', experience: '~6 yrs' },
      { name: 'Edge Computing', experience: '~4 yrs' },
      { name: 'CloudFront', experience: '3+ yrs' },
      { name: 'Cloudflare', experience: '3+ yrs' },
      { name: 'Cloudflare Workers', experience: '~3 yrs' },
      { name: 'R2 Storage', experience: '~2 yrs' },
      { name: 'Docker', experience: '~6 yrs' },
      { name: 'Vagrant', experience: '~6 yrs' },
      { name: 'Nginx', experience: '17 yrs' },
      { name: 'Apache', experience: '17 yrs' },
      { name: 'IIS', experience: '17 yrs' },
    ],
  },
  {
    label: 'Platforms',
    items: [
      { name: 'Unix/Linux', experience: '17 yrs' },
      { name: 'Windows Server', experience: '17 yrs' },
      { name: 'macOS', experience: '10+ yrs' },
      { name: 'Android', experience: '7+ yrs' },
      { name: 'iOS', experience: '7+ yrs' },
      { name: 'Bash / shell scripting', experience: '10+ yrs' },
    ],
  },
  {
    label: 'Delivery',
    items: [
      { name: 'Git', experience: '~12 yrs' },
      { name: 'CI/CD', experience: '10+ yrs' },
      { name: 'JIRA', experience: '~6 yrs' },
      { name: 'GitHub Actions', experience: '3+ yrs' },
      { name: 'GitLab CI', experience: '3+ yrs' },
      { name: 'CircleCI', experience: '5+ yrs' },
      { name: 'Travis CI', experience: '~3 yrs' },
      { name: 'Jenkins', experience: '5+ yrs' },
      { name: 'Observability', experience: '5+ yrs' },
      { name: 'Datadog', experience: '~3 yrs' },
      { name: 'LaunchDarkly', experience: '~4 yrs' },
      { name: 'Google Analytics', experience: '10 yrs' },
      { name: 'Mixpanel', experience: '~3 yrs' },
      { name: 'ClickUp + automation', experience: '~3 yrs' },
      { name: 'Zapier', experience: '2+ yrs' },
      { name: 'SVN', experience: '17 yrs' },
    ],
  },
  {
    label: 'AI tooling',
    items: [
      { name: 'OpenAI API', experience: '2 yrs' },
      { name: 'LLM Applications', experience: '2 yrs' },
      { name: 'Prompt Engineering', experience: '2 yrs' },
      { name: 'AI Integration', experience: '2 yrs' },
      { name: 'LLM-assisted dev (ChatGPT)', experience: '~3 yrs' },
      { name: 'RAG (Retrieval-Augmented Generation)', experience: '~1 yr' },
      { name: 'AI Agents', experience: '~1 yr' },
      { name: 'Agentic AI', experience: '~1 yr' },
      { name: 'AI Workflow Automation', experience: '~1 yr' },
      { name: 'Workflow automation (n8n)', experience: '2 yrs' },
      { name: 'Cursor', experience: '~2 yrs' },
      { name: 'Claude', experience: '2 yrs' },
      { name: 'AI review + refactor (Codex)', experience: '2 yrs' },
      { name: 'Gemini', experience: '2 yrs' },
      { name: 'MCP (Model Context Protocol)', experience: '~1 yr' },
      { name: 'AI-assisted development', experience: '3+ yrs' },
    ],
  },
  {
    label: 'Engineering practice',
    items: [
      { name: 'Software engineering', experience: '20+ yrs' },
      { name: 'Full-stack development', experience: '18+ yrs' },
      { name: 'Frontend development', experience: '18+ yrs' },
      { name: 'Backend development', experience: '18+ yrs' },
      { name: 'Web application development', experience: '20+ yrs' },
      { name: 'Mobile development', experience: '10+ yrs' },
      { name: 'Mobile application development', experience: '10+ yrs' },
      { name: 'Cross-platform development', experience: '10+ yrs' },
      { name: 'REST API development', experience: '15+ yrs' },
      { name: 'API integration', experience: '15+ yrs' },
      { name: 'Microservices', experience: '10+ yrs' },
      { name: 'Event-Driven Architecture', experience: '~10 yrs' },
      { name: 'Authentication & authorization', experience: '15+ yrs' },
      { name: 'System design', experience: '15+ yrs' },
      { name: 'Software architecture', experience: '15+ yrs' },
      { name: 'Database design', experience: '17+ yrs' },
      { name: 'Performance optimization', experience: '15+ yrs' },
      { name: 'Monitoring & logging', experience: '10+ yrs' },
      { name: 'Feature flags', experience: '8+ yrs' },
      { name: 'Product analytics', experience: '10+ yrs' },
      { name: 'Agile development', experience: '12+ yrs' },
      { name: 'Scrum', experience: '10+ yrs' },
      { name: 'Technical leadership', experience: '12+ yrs' },
      { name: 'Team leadership', experience: '12+ yrs' },
      { name: 'Engineering management', experience: '10+ yrs' },
      { name: 'Technical project delivery', experience: '15+ yrs' },
    ],
  },
]
