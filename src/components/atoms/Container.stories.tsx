import type { Meta, StoryObj } from '@storybook/react-vite'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { Container } from './Container'

const meta = {
  title: 'Atoms/Container',
  component: Container,
  tags: ['autodocs'],
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Container {...args}>
      <p className="rounded-xl border border-sand/15 bg-ink2/60 p-4 text-sm text-sand/80">
        Centered content within the max-width container.
      </p>
    </Container>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Container>
        <p className="text-sm text-sand/70">Default max-width container</p>
      </Container>
      <Container className="max-w-3xl border border-gold-500/20">
        <p className="text-sm text-sand/70">Narrow override via className</p>
      </Container>
    </div>
  ),
}

export const Accessibility: Story = {
  render: (args) => (
    <Container {...args} role="region" aria-label="Featured work section">
      <h2 className="text-lg font-semibold">Featured work</h2>
      <p className="mt-2 text-sm text-sand/70">Landmark region with an accessible label.</p>
    </Container>
  ),
  ...a11yStoryParameters,
}
