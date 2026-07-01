import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { heroSlides } from '../../content/homeSections'
import { HeroCarouselControls } from './HeroCarouselControls'

const meta = {
  title: 'Molecules/HeroCarouselControls',
  component: HeroCarouselControls,
  tags: ['autodocs'],
} satisfies Meta<typeof HeroCarouselControls>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render() {
    const [activeIndex, setActiveIndex] = useState(0)
    return (
      <HeroCarouselControls
        slides={heroSlides.slice(0, 3)}
        activeIndex={activeIndex}
        onPrev={() => setActiveIndex((index) => Math.max(0, index - 1))}
        onNext={() =>
          setActiveIndex((index) => Math.min(2, index + 1))
        }
        onSelect={setActiveIndex}
      />
    )
  },
}

export const Variants: Story = {
  render: function Render() {
    const [activeIndex, setActiveIndex] = useState(1)
    return (
      <div className="space-y-4">
        <HeroCarouselControls
          slides={heroSlides.slice(0, 3)}
          activeIndex={activeIndex}
          onPrev={() => setActiveIndex((index) => Math.max(0, index - 1))}
          onNext={() => setActiveIndex((index) => Math.min(2, index + 1))}
          onSelect={setActiveIndex}
        />
        <HeroCarouselControls
          slides={heroSlides.slice(0, 3)}
          activeIndex={activeIndex}
          onPrev={() => setActiveIndex((index) => Math.max(0, index - 1))}
          onNext={() => setActiveIndex((index) => Math.min(2, index + 1))}
          onSelect={setActiveIndex}
          className="opacity-80"
        />
      </div>
    )
  },
}

export const Accessibility: Story = {
  render: function Render() {
    const [activeIndex, setActiveIndex] = useState(0)
    return (
      <HeroCarouselControls
        slides={heroSlides.slice(0, 3)}
        activeIndex={activeIndex}
        onPrev={() => setActiveIndex((index) => Math.max(0, index - 1))}
        onNext={() => setActiveIndex((index) => Math.min(2, index + 1))}
        onSelect={setActiveIndex}
      />
    )
  },
  ...a11yStoryParameters,
}
