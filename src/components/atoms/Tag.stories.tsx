import type { Meta, StoryObj } from '@storybook/react-vite'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { Tag } from './Tag'

const meta = {
  title: 'Atoms/Tag',
  component: Tag,
  tags: ['autodocs'],
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'React',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag>React</Tag>
      <Tag>TypeScript</Tag>
      <Tag className="border-gold-500/30 text-gold-200">Featured</Tag>
    </div>
  ),
}

export const Accessibility: Story = {
  args: {
    children: 'TypeScript',
    role: 'status',
    'aria-label': 'Technology: TypeScript',
  },
  ...a11yStoryParameters,
}
