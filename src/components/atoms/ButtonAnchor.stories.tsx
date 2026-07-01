import type { Meta, StoryObj } from '@storybook/react-vite'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { ButtonAnchor } from './ButtonAnchor'

const meta = {
  title: 'Atoms/ButtonAnchor',
  component: ButtonAnchor,
  tags: ['autodocs'],
} satisfies Meta<typeof ButtonAnchor>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    href: 'https://example.com',
    children: 'View resume',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <ButtonAnchor href="#portfolio" variant="primary">Primary link</ButtonAnchor>
      <ButtonAnchor href="#services" variant="secondary">Secondary link</ButtonAnchor>
      <ButtonAnchor href="#about" variant="ghost">Ghost link</ButtonAnchor>
    </div>
  ),
}

export const Accessibility: Story = {
  args: {
    href: 'https://example.com/resume.pdf',
    children: 'Download resume PDF',
    'aria-label': 'Download Jerome Erazo resume PDF',
  },
  ...a11yStoryParameters,
}
