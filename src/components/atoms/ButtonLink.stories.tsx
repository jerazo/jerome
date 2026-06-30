import type { Meta, StoryObj } from '@storybook/react-vite'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { ButtonLink } from './ButtonLink'

const meta = {
  title: 'Atoms/ButtonLink',
  component: ButtonLink,
  tags: ['autodocs'],
} satisfies Meta<typeof ButtonLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    to: '/showcase',
    children: 'View showcase',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <ButtonLink to="/" variant="primary">Home</ButtonLink>
      <ButtonLink to="/showcase" variant="secondary">Showcase</ButtonLink>
      <ButtonLink to="/#contact" variant="ghost">Contact</ButtonLink>
    </div>
  ),
}

export const Accessibility: Story = {
  args: {
    to: '/showcase',
    children: 'Open interactive showcase gallery',
    'aria-label': 'Open interactive showcase gallery',
  },
  ...a11yStoryParameters,
}
