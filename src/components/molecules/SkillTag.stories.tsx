import type { Meta, StoryObj } from '@storybook/react-vite'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { SkillTag } from './SkillTag'

const meta = {
  title: 'Molecules/SkillTag',
  component: SkillTag,
  tags: ['autodocs'],
} satisfies Meta<typeof SkillTag>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'React',
    experience: '10+ years',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <SkillTag name="React" experience="10+ years" />
      <SkillTag name="TypeScript" experience="8 years" tier="featured" />
      <SkillTag name="AWS" experience="6 years" tier="default" />
    </div>
  ),
}

export const Accessibility: Story = {
  args: {
    name: 'Accessibility',
    experience: 'WCAG-focused delivery',
    tier: 'featured',
  },
  ...a11yStoryParameters,
}
