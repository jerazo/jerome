import type { Meta, StoryObj } from '@storybook/react-vite'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { CopyLinkButton } from './CopyLinkButton'

const meta = {
  title: 'Atoms/CopyLinkButton',
  component: CopyLinkButton,
  tags: ['autodocs'],
} satisfies Meta<typeof CopyLinkButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    url: 'https://jerome.erazo.dev/showcase/digital-creator',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <CopyLinkButton url="https://jerome.erazo.dev/showcase/project-a" />
      <CopyLinkButton
        url="https://jerome.erazo.dev/showcase/project-b"
        label="Copy showcase link"
      />
    </div>
  ),
}

export const Accessibility: Story = {
  args: {
    url: 'https://jerome.erazo.dev/showcase/digital-creator',
    label: 'Copy link to Digital Creator project',
  },
  ...a11yStoryParameters,
}
