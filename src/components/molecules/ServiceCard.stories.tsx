import type { Meta, StoryObj } from '@storybook/react-vite'
import { Code2 } from 'lucide-react'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { ServiceCard } from './ServiceCard'

const meta = {
  title: 'Molecules/ServiceCard',
  component: ServiceCard,
  tags: ['autodocs'],
} satisfies Meta<typeof ServiceCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Platform engineering',
    description: 'Design and ship resilient systems that scale with your product.',
    bullets: ['Architecture reviews', 'CI/CD pipelines', 'Observability'],
    icon: <Code2 size={20} aria-hidden />,
  },
}

export const Variants: Story = {
  render: () => (
    <div className="grid gap-4 max-w-xl">
      <ServiceCard
        title="Tech leadership"
        description="Player-coach engineering leadership for growing teams."
        bullets={['Hiring', 'Roadmaps', 'Delivery coaching']}
        icon={<Code2 size={20} aria-hidden />}
      />
      <ServiceCard
        title="Full-stack delivery"
        description="End-to-end product engineering from API to UI."
        bullets={['React', 'Node.js', 'Cloud native']}
        icon={<Code2 size={20} aria-hidden />}
      />
    </div>
  ),
}

export const Accessibility: Story = {
  args: {
    title: 'Accessibility-first UI',
    description: 'Inclusive interfaces with semantic HTML and keyboard support.',
    bullets: ['WCAG patterns', 'Screen reader testing', 'Focus management'],
    icon: <Code2 size={20} aria-hidden />,
  },
  ...a11yStoryParameters,
}
