import type { Meta, StoryObj } from '@storybook/react-vite'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { TruncatedText } from './TruncatedText'

const meta = {
  title: 'Atoms/TruncatedText',
  component: TruncatedText,
  tags: ['autodocs'],
} satisfies Meta<typeof TruncatedText>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: 'Tech lead building production platforms',
    className: 'max-w-[12rem] text-sm',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-3 max-w-xs">
      <TruncatedText
        text="Short label"
        className="block text-sm"
      />
      <TruncatedText
        text="This longer portfolio title truncates with an ellipsis when space is limited"
        className="block text-sm"
      />
      <TruncatedText
        text="Custom truncated styling"
        className="block max-w-[10rem] text-xs text-gold-200"
      />
    </div>
  ),
}

export const Accessibility: Story = {
  args: {
    text: 'Fire Products Configurator — enterprise e-commerce platform',
    className: 'block max-w-[14rem] text-sm',
    'aria-label': 'Fire Products Configurator — enterprise e-commerce platform',
  },
  ...a11yStoryParameters,
}
