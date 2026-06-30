import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect } from 'react'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { useUiStore } from '../../store/uiStore'
import { MaskedContactValue } from './MaskedContactValue'

const meta = {
  title: 'Molecules/MaskedContactValue',
  component: MaskedContactValue,
  tags: ['autodocs'],
} satisfies Meta<typeof MaskedContactValue>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    field: 'email',
  },
  decorators: [
    (StoryComponent) => {
      useEffect(() => {
        useUiStore.setState({ contactDetailsRevealed: false })
      }, [])
      return <StoryComponent />
    },
  ],
}

export const Variants: Story = {
  render: function Render() {
    useEffect(() => {
      useUiStore.setState({ contactDetailsRevealed: false })
    }, [])

    return (
      <div className="space-y-2 text-sm">
        <MaskedContactValue field="email" />
        <MaskedContactValue field="phone" />
        <MaskedContactValue field="location" />
      </div>
    )
  },
}

export const Accessibility: Story = {
  args: {
    field: 'email',
  },
  decorators: [
    (StoryComponent) => {
      useEffect(() => {
        useUiStore.setState({ contactDetailsRevealed: true })
      }, [])
      return <StoryComponent />
    },
  ],
  ...a11yStoryParameters,
}
