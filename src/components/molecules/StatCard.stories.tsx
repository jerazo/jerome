import type { Meta, StoryObj } from '@storybook/react-vite'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { StatCard } from './StatCard'

const meta = {
  title: 'Molecules/StatCard',
  component: StatCard,
  tags: ['autodocs'],
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Years experience',
    value: '20+',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="grid gap-4 sm:grid-cols-3 max-w-2xl">
      <StatCard label="Platforms shipped" value="12+" />
      <StatCard label="Users served" value="1M+" />
      <StatCard label="Latency reduction" value="45%" />
    </div>
  ),
}

export const Accessibility: Story = {
  args: {
    label: 'Production platforms',
    value: '12+',
  },
  ...a11yStoryParameters,
}
