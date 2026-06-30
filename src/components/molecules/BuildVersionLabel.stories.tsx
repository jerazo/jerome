import type { Meta, StoryObj } from '@storybook/react-vite'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { BuildVersionLabel } from './BuildVersionLabel'

const meta = {
  title: 'Molecules/BuildVersionLabel',
  component: BuildVersionLabel,
  tags: ['autodocs'],
} satisfies Meta<typeof BuildVersionLabel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-2">
      <BuildVersionLabel />
      <BuildVersionLabel className="text-xs text-gold-200" />
    </div>
  ),
}

export const Accessibility: Story = {
  args: {
    className: 'text-sm',
  },
  ...a11yStoryParameters,
}
