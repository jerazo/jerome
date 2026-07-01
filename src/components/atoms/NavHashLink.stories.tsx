import type { Meta, StoryObj } from '@storybook/react-vite'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { NavHashLink } from './NavHashLink'

const meta = {
  title: 'Atoms/NavHashLink',
  component: NavHashLink,
  tags: ['autodocs'],
} satisfies Meta<typeof NavHashLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    to: '/#portfolio',
    children: 'Portfolio',
    className: 'text-sm text-sand/70 hover:text-sand',
    activeClassName: 'text-gold-200',
  },
}

export const Variants: Story = {
  render: () => (
    <nav className="flex flex-wrap gap-4">
      <NavHashLink
        to="/#portfolio"
        className="text-sm text-sand/70"
        activeClassName="text-gold-200"
      >
        Portfolio
      </NavHashLink>
      <NavHashLink
        to="/#services"
        className="text-sm text-sand/70"
        activeClassName="text-gold-200"
      >
        Services
      </NavHashLink>
      <NavHashLink
        to="/showcase"
        className="text-sm text-sand/70"
        activeClassName="text-gold-200"
      >
        Showcase
      </NavHashLink>
    </nav>
  ),
}

export const Accessibility: Story = {
  args: {
    to: '/#contact',
    children: 'Contact',
    className: 'text-sm text-sand/80 underline-offset-4 hover:underline',
    activeClassName: 'text-gold-200',
    role: undefined,
  },
  ...a11yStoryParameters,
}
