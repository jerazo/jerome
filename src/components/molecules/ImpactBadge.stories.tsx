import type { Meta, StoryObj } from '@storybook/react-vite'
import { samplePortfolioProject } from '../../stories/fixtures'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { ImpactBadge, ImpactMetricHighlight } from './ImpactBadge'

const meta = {
  title: 'Molecules/ImpactBadge',
  component: ImpactBadge,
  tags: ['autodocs'],
} satisfies Meta<typeof ImpactBadge>

export default meta
type Story = StoryObj<typeof meta>

const metrics = samplePortfolioProject.impactMetrics ?? [
  { label: 'Latency', value: '-45%' },
  { label: 'Users', value: '1M+' },
]

export const Default: Story = {
  args: {
    metrics,
  },
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <ImpactBadge metrics={metrics} />
      <ImpactBadge metrics={metrics} variant="summary" />
      {metrics[0] && <ImpactMetricHighlight metric={metrics[0]} glow />}
    </div>
  ),
}

export const Accessibility: Story = {
  args: {
    metrics,
  },
  ...a11yStoryParameters,
}
