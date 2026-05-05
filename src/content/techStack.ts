export type SkillItem = {
  name: string
  experience: string
}

export type SkillCategory = {
  label: string
  items: SkillItem[]
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
      { name: 'API design', experience: '15+ yrs' },
      { name: 'Laravel', experience: '~8 yrs' },
      { name: 'Zend', experience: '8 yrs' },
    ],
  },
  {
    label: 'Data',
    items: [
      { name: 'MySQL', experience: '17 yrs' },
      { name: 'PostgreSQL', experience: '10+ yrs' },
      { name: 'Supabase', experience: '2+ yrs' },
      { name: 'MongoDB', experience: '9+ yrs' },
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
      { name: 'CloudFront', experience: '3+ yrs' },
      { name: 'Cloudflare', experience: '3+ yrs' },
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
      { name: 'Cursor', experience: '~2 yrs' },
      { name: 'Claude', experience: '2 yrs' },
      { name: 'LLM-assisted dev (ChatGPT)', experience: '~3 yrs' },
      { name: 'AI review + refactor (Codex)', experience: '2 yrs' },
      { name: 'Gemini', experience: '2 yrs' },
      { name: 'Workflow automation (n8n)', experience: '2 yrs' },
    ],
  },
]
