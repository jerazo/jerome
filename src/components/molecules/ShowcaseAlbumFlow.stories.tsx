import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { portfolioProjects } from '../../content/portfolio'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { ShowcaseAlbumFlow } from './ShowcaseAlbumFlow'

const meta = {
  title: 'Molecules/ShowcaseAlbumFlow',
  component: ShowcaseAlbumFlow,
  tags: ['autodocs'],
} satisfies Meta<typeof ShowcaseAlbumFlow>

export default meta
type Story = StoryObj<typeof meta>

const projects = portfolioProjects.slice(0, 4)

export const Default: Story = {
  render: function Render() {
    const [activeIndex, setActiveIndex] = useState(0)
    return (
      <ShowcaseAlbumFlow
        projects={projects}
        activeIndex={activeIndex}
        onActiveIndexChange={setActiveIndex}
        onOpenImage={() => undefined}
        onViewDetails={() => undefined}
      />
    )
  },
}

export const Variants: Story = {
  render: function Render() {
    const [activeIndex, setActiveIndex] = useState(1)
    return (
      <ShowcaseAlbumFlow
        projects={projects}
        activeIndex={activeIndex}
        onActiveIndexChange={setActiveIndex}
        onOpenImage={() => undefined}
        onViewDetails={() => undefined}
        className="max-w-5xl"
      />
    )
  },
}

export const Accessibility: Story = {
  render: function Render() {
    const [activeIndex, setActiveIndex] = useState(0)
    return (
      <ShowcaseAlbumFlow
        projects={projects}
        activeIndex={activeIndex}
        onActiveIndexChange={setActiveIndex}
        onOpenImage={() => undefined}
        onViewDetails={() => undefined}
      />
    )
  },
  ...a11yStoryParameters,
}
