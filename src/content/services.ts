export type Service = {
  title: string
  description: string
  bullets: string[]
}

export const services: Service[] = [
  {
    title: 'Full‑Stack Web Apps',
    description:
      'End‑to‑end delivery of web applications with scalable architecture and clean developer experience.',
    bullets: [
      'React + TypeScript frontends',
      'Node.js APIs and integrations',
      'Auth, payments, dashboards, admin tools',
      'Production readiness: CI/CD, monitoring, rollback strategy',
    ],
  },
  {
    title: 'Front‑End Systems',
    description:
      'Design systems and UI engineering that keep teams fast while maintaining quality and accessibility.',
    bullets: [
      'Component libraries (Atomic design)',
      'Performance profiling and improvements',
      'Responsive layouts and WCAG-friendly patterns',
      'Design-to-code handoff and standards',
    ],
  },
  {
    title: 'Architecture & Technical Leadership',
    description:
      'Player‑coach leadership: aligning architecture with delivery, mentoring teams, and raising the bar.',
    bullets: [
      'System design and technical planning',
      'Code review standards and quality gates',
      'Mentorship and hiring support',
      'Delivery discipline: realistic estimation and execution',
    ],
  },
  {
    title: 'Performance & Observability',
    description:
      'Make systems measurable, stable, and fast, so teams ship confidently and users feel the difference.',
    bullets: [
      'Tracing, metrics, and logging strategy',
      'Error monitoring and alerting',
      'Core Web Vitals improvements',
      'Build and bundle optimization',
    ],
  },
]

