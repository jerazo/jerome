import type { Meta, StoryObj } from '@storybook/react-vite'
import { portfolioProjects } from '../../content/portfolio'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { PrefetchProjectImages } from './PrefetchProjectImages'

const meta = {
  title: 'Molecules/PrefetchProjectImages',
  component: PrefetchProjectImages,
  tags: ['autodocs'],
} satisfies Meta<typeof PrefetchProjectImages>

export default meta
type Story = StoryObj<typeof meta>

const projects = portfolioProjects.slice(0, 4)

export const Default: Story = {
  args: {
    projects,
    activeIndex: 0,
  },
  render: (args) => (
    <>
      <PrefetchProjectImages {...args} />
      <p className="text-sm text-sand/70">
        Side-effect component — prefetches next portfolio images (renders nothing).
      </p>
    </>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-2 text-sm text-sand/70">
      <PrefetchProjectImages projects={projects} activeIndex={0} prefetchCount={1} />
      <PrefetchProjectImages projects={projects} activeIndex={2} prefetchCount={3} />
      <p>Multiple prefetch configurations mounted for demonstration.</p>
    </div>
  ),
}

export const Accessibility: Story = {
  args: {
    projects,
    activeIndex: 1,
    prefetchCount: 2,
  },
  render: (args) => (
    <>
      <PrefetchProjectImages {...args} />
      <p className="text-sm text-sand/70">No visible UI — accessibility checks apply to surrounding docs.</p>
    </>
  ),
  ...a11yStoryParameters,
}
