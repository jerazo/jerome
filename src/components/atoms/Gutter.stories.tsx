import type { Meta, StoryObj } from '@storybook/react-vite'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { Gutter } from './Gutter'

const meta = {
  title: 'Atoms/Gutter',
  component: Gutter,
  tags: ['autodocs'],
} satisfies Meta<typeof Gutter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Gutter {...args}>
      <p className="rounded-lg border border-sand/10 bg-ink2/50 p-4 text-sm text-sand/75">
        Horizontal padding gutter for full-bleed sections.
      </p>
    </Gutter>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Gutter>
        <p className="text-sm text-sand/70">Default responsive gutter padding</p>
      </Gutter>
      <Gutter className="bg-gold-500/10">
        <p className="text-sm text-sand/70">Gutter with custom background</p>
      </Gutter>
    </div>
  ),
}

export const Accessibility: Story = {
  render: (args) => (
    <Gutter {...args} role="group" aria-label="Portfolio filters">
      <button type="button" className="rounded-full border border-sand/20 px-3 py-1 text-xs">
        All projects
      </button>
    </Gutter>
  ),
  ...a11yStoryParameters,
}
