import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { showcaseItems } from '../../content/showcase'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { ShowcaseCarouselControls } from './ShowcaseCarouselControls'

const meta = {
  title: 'Molecules/ShowcaseCarouselControls',
  component: ShowcaseCarouselControls,
  tags: ['autodocs'],
} satisfies Meta<typeof ShowcaseCarouselControls>

export default meta
type Story = StoryObj<typeof meta>

const items = showcaseItems.slice(0, 4).map((item) => ({
  id: item.id,
  label: item.title,
}))

export const Default: Story = {
  render: function Render() {
    const [activeIndex, setActiveIndex] = useState(0)
    return (
      <ShowcaseCarouselControls
        items={items}
        activeIndex={activeIndex}
        onPrev={() => setActiveIndex((index) => Math.max(0, index - 1))}
        onNext={() => setActiveIndex((index) => Math.min(items.length - 1, index + 1))}
        onSelect={setActiveIndex}
      />
    )
  },
}

export const Variants: Story = {
  render: function Render() {
    const [activeIndex, setActiveIndex] = useState(2)
    return (
      <ShowcaseCarouselControls
        items={items}
        activeIndex={activeIndex}
        onPrev={() => setActiveIndex((index) => Math.max(0, index - 1))}
        onNext={() => setActiveIndex((index) => Math.min(items.length - 1, index + 1))}
        onSelect={setActiveIndex}
        className="opacity-90"
        ariaLabel="Showcase carousel navigation"
      />
    )
  },
}

export const Accessibility: Story = {
  render: function Render() {
    const [activeIndex, setActiveIndex] = useState(0)
    return (
      <ShowcaseCarouselControls
        items={items}
        activeIndex={activeIndex}
        onPrev={() => setActiveIndex((index) => Math.max(0, index - 1))}
        onNext={() => setActiveIndex((index) => Math.min(items.length - 1, index + 1))}
        onSelect={setActiveIndex}
        ariaLabel="Showcase projects"
      />
    )
  },
  ...a11yStoryParameters,
}
