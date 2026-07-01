import type { Meta, StoryObj } from '@storybook/react-vite'
import { sampleHeroSlide } from '../../stories/fixtures'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { HeroSlideCopy } from './HeroSlideCopy'

const meta = {
  title: 'Molecules/HeroSlideCopy',
  component: HeroSlideCopy,
  tags: ['autodocs'],
} satisfies Meta<typeof HeroSlideCopy>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    slide: sampleHeroSlide,
  },
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-8 max-w-3xl">
      <HeroSlideCopy slide={sampleHeroSlide} />
      <HeroSlideCopy slide={sampleHeroSlide} compact showCta={false} />
      <HeroSlideCopy slide={sampleHeroSlide} glowActive animate />
    </div>
  ),
}

export const Accessibility: Story = {
  args: {
    slide: sampleHeroSlide,
    showCta: true,
  },
  ...a11yStoryParameters,
}
