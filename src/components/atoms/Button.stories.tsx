import type { Meta, StoryObj } from '@storybook/react-vite'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { Button } from './Button'

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Contact me',
    type: 'button',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="primary" size="sm">Small</Button>
    </div>
  ),
}

export const Accessibility: Story = {
  args: {
    children: 'Submit form',
    type: 'submit',
    'aria-label': 'Submit contact form',
  },
  ...a11yStoryParameters,
}
