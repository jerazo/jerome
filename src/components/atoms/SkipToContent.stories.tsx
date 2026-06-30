import type { Meta, StoryObj } from '@storybook/react-vite'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { SkipToContent } from './SkipToContent'

const meta = {
  title: 'Atoms/SkipToContent',
  component: SkipToContent,
  tags: ['autodocs'],
} satisfies Meta<typeof SkipToContent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <>
      <SkipToContent />
      <main id="main-content" className="mt-4 rounded-lg border border-sand/10 p-4 text-sm">
        Main content landmark for skip-link target.
      </main>
    </>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <SkipToContent />
      <p className="text-sm text-sand/70">
        Tab to reveal the skip link, then activate it to focus main content.
      </p>
      <main id="main-content" className="rounded-lg border border-sand/10 p-4 text-sm">
        Focus target
      </main>
    </div>
  ),
}

export const Accessibility: Story = {
  render: () => (
    <>
      <SkipToContent />
      <main id="main-content" tabIndex={-1} className="mt-4 rounded-lg border border-sand/10 p-4">
        Accessible skip navigation to primary content.
      </main>
    </>
  ),
  ...a11yStoryParameters,
}
