import type { Meta, StoryObj } from '@storybook/react-vite'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { SectionHeading } from './SectionHeading'

const meta = {
  title: 'Molecules/SectionHeading',
  component: SectionHeading,
  tags: ['autodocs'],
} satisfies Meta<typeof SectionHeading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    eyebrow: 'Portfolio',
    title: 'Selected work',
    description: 'Production platforms across fintech, healthtech, and SaaS.',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-8 max-w-2xl">
      <SectionHeading eyebrow="Services" title="What I deliver" />
      <SectionHeading
        eyebrow="About"
        title="Tech lead"
        description="20+ years building web platforms and leading engineering teams."
      />
    </div>
  ),
}

export const Accessibility: Story = {
  args: {
    eyebrow: 'Experience',
    title: 'Career timeline',
    description: 'Roles where I led platform engineering and delivery.',
  },
  ...a11yStoryParameters,
}
