import type { Meta, StoryObj } from '@storybook/react-vite'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { FooterContactCta } from './FooterContactCta'

const meta = {
  title: 'Molecules/FooterContactCta',
  component: FooterContactCta,
  tags: ['autodocs'],
} satisfies Meta<typeof FooterContactCta>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <FooterContactCta />
      <FooterContactCta className="rounded-2xl border border-sand/10 p-4" />
    </div>
  ),
}

export const Accessibility: Story = {
  args: {},
  ...a11yStoryParameters,
}
