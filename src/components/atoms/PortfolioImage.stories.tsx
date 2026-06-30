import type { Meta, StoryObj } from '@storybook/react-vite'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { PortfolioImage } from './PortfolioImage'

const meta = {
  title: 'Atoms/PortfolioImage',
  component: PortfolioImage,
  tags: ['autodocs'],
} satisfies Meta<typeof PortfolioImage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: '/portfolio/digital-creator/projects.png',
    alt: 'Digital Creator project library screenshot',
    className: 'h-48 w-80',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <PortfolioImage
        src="/portfolio/digital-creator/projects.png"
        alt="Lazy-loaded portfolio image"
        loading="lazy"
        className="h-40 w-64"
      />
      <PortfolioImage
        src="/portfolio/digital-creator/projects.png"
        alt="Eager-loaded portfolio image"
        loading="eager"
        className="h-40 w-64 rounded-xl"
      />
    </div>
  ),
}

export const Accessibility: Story = {
  args: {
    src: '/portfolio/digital-creator/projects.png',
    alt: 'Screenshot of the Digital Creator video project dashboard',
    className: 'h-48 w-80',
  },
  ...a11yStoryParameters,
}
