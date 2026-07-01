import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import type { SkillTierFilterValue } from './SkillTierFilters'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { SkillTierFilters } from './SkillTierFilters'

const meta = {
  title: 'Molecules/SkillTierFilters',
  component: SkillTierFilters,
  tags: ['autodocs'],
} satisfies Meta<typeof SkillTierFilters>

export default meta
type Story = StoryObj<typeof meta>

const counts = {
  primary: 8,
  featured: 24,
  default: 12,
}

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState<SkillTierFilterValue>(null)
    return <SkillTierFilters value={value} onChange={setValue} counts={counts} />
  },
}

export const Variants: Story = {
  render: function Render() {
    const [value, setValue] = useState<SkillTierFilterValue>('primary')
    return (
      <div className="space-y-4">
        <SkillTierFilters value={value} onChange={setValue} counts={counts} />
        <SkillTierFilters
          value="default"
          onChange={() => undefined}
          counts={{ primary: 2, featured: 5, default: 20 }}
        />
      </div>
    )
  },
}

export const Accessibility: Story = {
  render: function Render() {
    const [value, setValue] = useState<SkillTierFilterValue>(null)
    return <SkillTierFilters value={value} onChange={setValue} counts={counts} />
  },
  ...a11yStoryParameters,
}
