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
      { name: 'JavaScript', experience: '17+ yrs' },
      { name: 'PHP', experience: '15+ yrs' },
      { name: 'Python', experience: '14+ yrs' },
      { name: 'C++', experience: '5+ yrs' },
    ],
  },
  {
    label: 'Front end',
    items: [
      { name: 'React', experience: '7–8 yrs' },
      { name: 'Next.js', experience: '5–6 yrs' },
      { name: 'Angular', experience: '10 yrs' },
      { name: 'jQuery', experience: '17 yrs' },
      { name: 'Vite', experience: '3–4 yrs' },
      { name: 'Ionic/Cordova', experience: '7–8 yrs' },
    ],
  },
  {
    label: 'Back end',
    items: [
      { name: 'Node.js', experience: '9–10 yrs' },
      { name: 'API design', experience: '15+ yrs' },
      { name: 'Laravel', experience: '7–8 yrs' },
      { name: 'Zend', experience: '8 yrs' },
    ],
  },
  {
    label: 'Data',
    items: [
      { name: 'MySQL', experience: '17 yrs' },
      { name: 'PostgreSQL', experience: '10+ yrs' },
      { name: 'MongoDB', experience: '9+ yrs' },
      { name: 'MS SQL', experience: '5+ yrs' },
    ],
  },
  {
    label: 'Cloud + DevOps',
    items: [
      { name: 'AWS', experience: '5–6 yrs' },
      { name: 'Docker', experience: '5–6 yrs' },
      { name: 'Vagrant', experience: '5–6 yrs' },
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
    ],
  },
  {
    label: 'Delivery',
    items: [
      { name: 'Git', experience: '10–12 yrs' },
      { name: 'SVN', experience: '17 yrs' },
      { name: 'JIRA', experience: '5–6 yrs' },
      { name: 'LaunchDarkly', experience: '3–4 yrs' },
      { name: 'GA', experience: '10 yrs' },
      { name: 'ClickUp Automation', experience: '2–3 yrs' },
    ],
  },
  {
    label: 'AI tooling',
    items: [
      { name: 'ChatGPT / LLMs', experience: '2–3 yrs' },
      { name: 'Cursor', experience: '1–2 yrs' },
      { name: 'Claude / Codex / Gemini', experience: '2 yrs' },
      { name: 'n8n', experience: '2 yrs' },
    ],
  },
]
