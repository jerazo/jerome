import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { MobileNavToggle } from './MobileNavToggle'

const meta = {
  title: 'Molecules/MobileNavToggle',
  component: MobileNavToggle,
  tags: ['autodocs'],
} satisfies Meta<typeof MobileNavToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false)
    return (
      <MobileNavToggle
        open={open}
        menuId="mobile-nav-menu"
        onToggle={() => setOpen((value) => !value)}
      />
    )
  },
}

export const Variants: Story = {
  render: function Render() {
    const [open, setOpen] = useState(true)
    return (
      <div className="flex items-center gap-4">
        <MobileNavToggle
          open={false}
          menuId="mobile-nav-closed"
          onToggle={() => undefined}
        />
        <MobileNavToggle
          open={open}
          menuId="mobile-nav-open"
          onToggle={() => setOpen((value) => !value)}
        />
      </div>
    )
  },
}

export const Accessibility: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false)
    return (
      <>
        <MobileNavToggle
          open={open}
          menuId="mobile-nav-a11y"
          onToggle={() => setOpen((value) => !value)}
        />
        <nav id="mobile-nav-a11y" hidden={!open} className="mt-4 text-sm">
          Navigation panel
        </nav>
      </>
    )
  },
  ...a11yStoryParameters,
}
