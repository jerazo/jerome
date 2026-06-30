import type { Meta, StoryObj } from '@storybook/react-vite'
import { portfolioProjects } from '../../content/portfolio'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { PortfolioAlbumGrid } from './PortfolioAlbumGrid'

const meta = {
  title: 'Molecules/PortfolioAlbumGrid',
  component: PortfolioAlbumGrid,
  tags: ['autodocs'],
} satisfies Meta<typeof PortfolioAlbumGrid>

export default meta
type Story = StoryObj<typeof meta>

const projects = portfolioProjects.slice(0, 3)

export const Default: Story = {
  args: {
    projects,
    onOpenImage: () => undefined,
    onViewDetails: () => undefined,
  },
}

export const Variants: Story = {
  render: () => (
    <PortfolioAlbumGrid
      projects={projects}
      onOpenImage={() => undefined}
      onViewDetails={() => undefined}
      className="max-w-5xl"
    />
  ),
}

export const Accessibility: Story = {
  args: {
    projects,
    onOpenImage: () => undefined,
    onViewDetails: () => undefined,
  },
  ...a11yStoryParameters,
}
