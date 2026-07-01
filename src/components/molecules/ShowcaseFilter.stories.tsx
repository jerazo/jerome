import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { showcaseItems } from '../../content/showcase'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { ShowcaseFilter } from './ShowcaseFilter'

const meta = {
  title: 'Molecules/ShowcaseFilter',
  component: ShowcaseFilter,
  tags: ['autodocs'],
} satisfies Meta<typeof ShowcaseFilter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState('all')
    return (
      <ShowcaseFilter
        items={showcaseItems}
        value={value}
        onChange={setValue}
      />
    )
  },
}

export const Variants: Story = {
  render: function Render() {
    const [value, setValue] = useState('all')
    return (
      <div className="space-y-4">
        <ShowcaseFilter items={showcaseItems} value={value} onChange={setValue} />
        <ShowcaseFilter
          items={showcaseItems}
          value={value}
          onChange={setValue}
          className="border border-sand/10 p-3 rounded-xl"
        />
      </div>
    )
  },
}

export const Accessibility: Story = {
  render: function Render() {
    const [value, setValue] = useState('all')
    return (
      <ShowcaseFilter
        items={showcaseItems}
        value={value}
        onChange={setValue}
      />
    )
  },
  ...a11yStoryParameters,
}
