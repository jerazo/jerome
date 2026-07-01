import type { Meta, StoryObj } from '@storybook/react-vite'
import { samplePortfolioProject } from '../../stories/fixtures'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { PortfolioProjectCard } from './PortfolioProjectCard'

const meta = {
  title: 'Molecules/PortfolioProjectCard',
  component: PortfolioProjectCard,
  tags: ['autodocs'],
} satisfies Meta<typeof PortfolioProjectCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    project: samplePortfolioProject,
    onOpenImage: () => undefined,
    onViewDetails: () => undefined,
  },
}

export const Variants: Story = {
  render: () => (
    <div className="grid gap-6 max-w-2xl">
      <PortfolioProjectCard
        project={samplePortfolioProject}
        onOpenImage={() => undefined}
        onViewDetails={() => undefined}
      />
      <PortfolioProjectCard
        project={samplePortfolioProject}
        onOpenImage={() => undefined}
        onViewDetails={() => undefined}
        variant="gallery"
        isActive
      />
      <PortfolioProjectCard
        project={samplePortfolioProject}
        onOpenImage={() => undefined}
        onViewDetails={() => undefined}
        variant="album"
        disableCoverFlowMotion
      />
    </div>
  ),
}

export const Accessibility: Story = {
  args: {
    project: samplePortfolioProject,
    onOpenImage: () => undefined,
    onViewDetails: () => undefined,
  },
  ...a11yStoryParameters,
}
