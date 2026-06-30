import type { Meta, StoryObj } from '@storybook/react-vite'
import { sampleExperienceEntry } from '../../stories/fixtures'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { ExperienceRoleCard } from './ExperienceRoleCard'

const meta = {
  title: 'Molecules/ExperienceRoleCard',
  component: ExperienceRoleCard,
  tags: ['autodocs'],
} satisfies Meta<typeof ExperienceRoleCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    entry: sampleExperienceEntry,
  },
}

export const Variants: Story = {
  render: () => (
    <div className="grid gap-4 max-w-xl">
      <ExperienceRoleCard entry={sampleExperienceEntry} />
      <ExperienceRoleCard entry={sampleExperienceEntry} compact />
    </div>
  ),
}

export const Accessibility: Story = {
  args: {
    entry: sampleExperienceEntry,
  },
  ...a11yStoryParameters,
}
