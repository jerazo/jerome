import type { Meta, StoryObj } from '@storybook/react-vite'
import { getPortfolioProjectImages } from '../../content/portfolio'
import { samplePortfolioProject } from '../../stories/fixtures'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { PortfolioImageModal } from './PortfolioImageModal'

const meta = {
  title: 'Molecules/PortfolioImageModal',
  component: PortfolioImageModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PortfolioImageModal>

export default meta
type Story = StoryObj<typeof meta>

const images = getPortfolioProjectImages(samplePortfolioProject)

export const Default: Story = {
  args: {
    state: {
      projectTitle: samplePortfolioProject.title,
      images,
      index: 0,
    },
    onClose: () => undefined,
  },
}

export const Variants: Story = {
  render: () => (
    <PortfolioImageModal
      state={{
        projectTitle: samplePortfolioProject.title,
        images,
        index: 1,
      }}
      onClose={() => undefined}
    />
  ),
}

export const Accessibility: Story = {
  args: {
    state: {
      projectTitle: samplePortfolioProject.title,
      images,
      index: 0,
    },
    onClose: () => undefined,
  },
  ...a11yStoryParameters,
}
