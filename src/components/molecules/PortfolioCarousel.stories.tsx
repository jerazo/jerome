import type { Meta, StoryObj } from '@storybook/react-vite'
import { getPortfolioProjectImages } from '../../content/portfolio'
import { samplePortfolioProject } from '../../stories/fixtures'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { PortfolioCarousel } from './PortfolioCarousel'

const meta = {
  title: 'Molecules/PortfolioCarousel',
  component: PortfolioCarousel,
  tags: ['autodocs'],
} satisfies Meta<typeof PortfolioCarousel>

export default meta
type Story = StoryObj<typeof meta>

const images = getPortfolioProjectImages(samplePortfolioProject)

export const Default: Story = {
  args: {
    images,
    onImageClick: () => undefined,
  },
}

export const Variants: Story = {
  render: () => (
    <div className="max-w-xl">
      <PortfolioCarousel images={images} onImageClick={() => undefined} />
    </div>
  ),
}

export const Accessibility: Story = {
  args: {
    images,
    onImageClick: () => undefined,
  },
  ...a11yStoryParameters,
}
