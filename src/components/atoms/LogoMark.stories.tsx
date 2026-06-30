import type { Meta, StoryObj } from '@storybook/react-vite'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { LogoMark } from './LogoMark'

const meta = {
  title: 'Atoms/LogoMark',
  component: LogoMark,
  tags: ['autodocs'],
} satisfies Meta<typeof LogoMark>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <LogoMark />
      <LogoMark className="text-base tracking-[0.22em]" />
      <LogoMark className="text-lg tracking-[0.24em]" />
    </div>
  ),
}

export const Accessibility: Story = {
  args: {
    className: 'text-sm',
  },
  ...a11yStoryParameters,
}
