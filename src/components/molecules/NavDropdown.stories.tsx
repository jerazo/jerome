import type { Meta, StoryObj } from '@storybook/react-vite'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { NavDropdown } from './NavDropdown'

const meta = {
  title: 'Molecules/NavDropdown',
  component: NavDropdown,
  tags: ['autodocs'],
} satisfies Meta<typeof NavDropdown>

export default meta
type Story = StoryObj<typeof meta>

const items = [
  { label: 'Portfolio', to: '/#portfolio' },
  { label: 'Services', to: '/#services' },
  { label: 'Showcase', to: '/showcase' },
]

export const Default: Story = {
  args: {
    label: 'Work',
    items,
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      <NavDropdown label="Work" items={items} />
      <NavDropdown
        label="More"
        items={[
          { label: 'About', to: '/#about' },
          { label: 'Contact', to: '/#contact' },
        ]}
      />
    </div>
  ),
}

export const Accessibility: Story = {
  args: {
    label: 'Work',
    items,
  },
  ...a11yStoryParameters,
}
