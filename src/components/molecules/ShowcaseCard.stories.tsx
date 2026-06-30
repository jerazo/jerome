import type { Meta, StoryObj } from '@storybook/react-vite'
import { sampleShowcaseItem } from '../../stories/fixtures'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { ShowcaseCard } from './ShowcaseCard'

const meta = {
  title: 'Molecules/ShowcaseCard',
  component: ShowcaseCard,
  tags: ['autodocs'],
} satisfies Meta<typeof ShowcaseCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    item: sampleShowcaseItem,
    onOpen: () => undefined,
  },
}

export const Variants: Story = {
  render: () => (
    <div className="grid gap-4 max-w-md">
      <ShowcaseCard item={sampleShowcaseItem} onOpen={() => undefined} />
      <ShowcaseCard
        item={sampleShowcaseItem}
        onOpen={() => undefined}
        className="border border-gold-500/20"
      />
    </div>
  ),
}

export const Accessibility: Story = {
  args: {
    item: sampleShowcaseItem,
    onOpen: () => undefined,
  },
  ...a11yStoryParameters,
}
