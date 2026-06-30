import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactElement } from 'react'
import { useEffect } from 'react'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { useUiStore } from '../../store/uiStore'
import { ContactAccessModal } from './ContactAccessModal'

const meta = {
  title: 'Molecules/ContactAccessModal',
  component: ContactAccessModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ContactAccessModal>

export default meta
type Story = StoryObj<typeof meta>

function OpenModalDecorator(StoryComponent: () => ReactElement) {
  useEffect(() => {
    useUiStore.setState({
      contactAccessModalOpen: true,
      contactDetailsRevealed: false,
    })
    return () => {
      useUiStore.setState({ contactAccessModalOpen: false })
    }
  }, [])

  return <StoryComponent />
}

export const Default: Story = {
  decorators: [OpenModalDecorator],
}

export const Variants: Story = {
  decorators: [
    (StoryComponent) => {
      useEffect(() => {
        useUiStore.setState({
          contactAccessModalOpen: true,
          contactDetailsRevealed: false,
        })
        return () => {
          useUiStore.setState({ contactAccessModalOpen: false })
        }
      }, [])
      return (
        <div className="bg-ink">
          <p className="p-4 text-sm text-sand/60">Modal overlay with OTP verification flow.</p>
          <StoryComponent />
        </div>
      )
    },
  ],
}

export const Accessibility: Story = {
  decorators: [OpenModalDecorator],
  ...a11yStoryParameters,
}
