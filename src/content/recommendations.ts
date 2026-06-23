export type Recommendation = {
  id: string
  quote: string
  author: string
  authorLinkedInUrl?: string
  authorImageSrc?: string
  authorTitle?: string
  relationship?: string
  date?: string
}

export const linkedInRecommendationsUrl =
  'https://www.linkedin.com/in/jeromeerazo/details/recommendations/'

export const recommendations: Recommendation[] = [
  {
    id: 'darius-lopez-2026-05-04',
    author: 'Darius Lopez',
    authorLinkedInUrl: 'https://www.linkedin.com/in/darius-lopez-44a58b248/',
    authorImageSrc: '/recommendations/darius-lopez.jpeg',
    authorTitle: 'Speaker / Training Manager / Head of Treasury / Head of Human Resources',
    relationship: 'Worked with Jerome on the same team',
    date: 'May 4, 2026',
    quote:
      "One of the best I have worked with, haven't seen one who can top his skills as of present date. His work is not confined in a box, he goes out of the box to improve process that is needed by clients. If you get to work with or under him, you are very lucky because you will learn a lot.",
  },
  {
    id: 'karen-bernadette-leonor-brizo-2025-11-23',
    author: 'Karen Bernadette Leonor-Brizo',
    authorLinkedInUrl: 'https://www.linkedin.com/in/karenleonor009',
    authorImageSrc: '/recommendations/karen-bernadette-leonor-brizo.jpg',
    authorTitle:
      'ISTQB CTFL - Software QA Analyst (Playwright Automation, Cursor, AI, Claude AI, Structured Prompt, Software Development Team)',
    relationship: 'Worked with Jerome on the same team',
    date: 'Nov 23, 2025',
    quote:
      'Jerome’s technical strength really stands out - his long stretch of experience in the tech have clearly paid off, matched by his natural enthusiasm for what he does. Working alongside him on the same project, I’ve seen how smoothly he tackles his tasks, meeting the requirements with only a few minor, mostly trivial issues. That’s given me the breathing room to concentrate on the deeper layers of testing.\n\nKudos to you, Jerome!',
  },
  {
    id: 'karlo-evangelista-2025-11-17',
    author: 'Karlo Evangelista',
    authorLinkedInUrl: 'https://www.linkedin.com/in/karlo-evangelista-b607092a8',
    authorImageSrc: '/recommendations/karlo-evangelista.jpg',
    authorTitle: 'Regional IT Support Specialist',
    relationship: 'Worked with Jerome on the same team',
    date: 'Nov 17, 2025',
    quote:
      "Jerome is among the best tech leads I have ever collaborated with. He is a vital member of Unicity's Asia Product Engineering Team. His skill makes the task run smoothly, and you can quickly follow his directions because they are very clear.\n\nYou're lucky if you get to work with Jerome, he is incredibly knowledgeable about both development and infrastructure. He doesn't appear to be under any pressure, all of his projects go extremely well and hit the target.",
  },
  {
    id: 'aigner-gregor-demillo-2025-11-17',
    author: 'Aigner Gregor Demillo',
    authorLinkedInUrl: 'https://www.linkedin.com/in/aignerdemillo',
    authorImageSrc: '/recommendations/aigner-gregor-demillo.jpg',
    authorTitle: 'Digital Product Manager',
    relationship: 'Worked with Jerome on the same team',
    date: 'Nov 17, 2025',
    quote:
      'I had the privilege of working with Jerome Erazo for 2 years and 6 months at Unicity, where he served as our Tech Lead. Jerome is one of the most reliable, solutions-driven, and collaborative engineers I’ve worked with.\n\nAs a tech lead, he consistently demonstrated deep technical expertise, clear problem-solving skills, and a strong sense of ownership. He has an exceptional ability to break down complex requirements, guide the team through the right architectural decisions, and deliver high-quality outputs on time. What I appreciate most about Jerome is his calm leadership style. He listens, understands the context, and provides thoughtful, practical recommendations.\n\nJerome is also a great partner to product and design. He ensures alignment early, communicates risks clearly, and always strives for the best possible user experience without compromising technical integrity.\n\nAnyone would be lucky to have Jerome leading their engineering efforts, and I highly recommend him for any senior engineering or leadership role.',
  },
  {
    id: 'john-alfred-reyes-2025-10-30',
    author: 'John Alfred Reyes',
    authorLinkedInUrl: 'https://www.linkedin.com/in/jreyesdev',
    authorImageSrc: '/recommendations/john-alfred-reyes.jpg',
    authorTitle:
      'Senior Full Stack Engineer | Freelancer | Spec Driven Developer | AI Developer | AI Driven Development | Node.js | Express.js | Fastify | React.js | Next.js | Python | AWS | SQL | Vibe Code Cleanup Specialist',
    relationship: 'Reported to Jerome directly',
    date: 'Oct 30, 2025',
    quote:
      'Jerome is one of the best manager that I had in my entire career. He demonstrates excellent technical and people skills, superb cross-functional collaborative mindset, and an admired and respected leader within the company. His mindset of simplicity over complexity is one of his standout qualities that really amplified the capability of our team. I highly recommend working with him.',
  },
  {
    id: 'will-ferrer-2024-03-29',
    author: 'Will Ferrer',
    authorLinkedInUrl: 'https://www.linkedin.com/in/will-ferrer-0339493a',
    authorImageSrc: '/recommendations/will-ferrer.jpg',
    authorTitle:
      'Helping Business Owners Figure Out Where AI & Software Move the Needle · Fractional COO, CTO & CAIO Available · CEO, Atlas Inspire & Tempest House · 38 Years in Software · 9 Years, Vetted Roster of 300+ Engineers',
    relationship: 'Mentor',
    date: 'Mar 29, 2024',
    quote:
      'I have worked with Jerome for nearly a decade on many projects and in multiple companies, and he is the number-one go-to person for any software project that falls within his expertise. Jerome is also a pleasure to work with and a completely upstanding person. Jerome comes with my highest recommendation.',
  },
]
