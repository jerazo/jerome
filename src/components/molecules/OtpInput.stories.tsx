import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { OtpInput } from './OtpInput'

const meta = {
  title: 'Molecules/OtpInput',
  component: OtpInput,
  tags: ['autodocs'],
} satisfies Meta<typeof OtpInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState('')
    return <OtpInput value={value} onChange={setValue} />
  },
}

export const Variants: Story = {
  render: function Render() {
    const [value, setValue] = useState('123')
    return (
      <div className="space-y-4">
        <OtpInput value={value} onChange={setValue} />
        <OtpInput value="" onChange={() => undefined} disabled />
        <OtpInput value="123456" onChange={() => undefined} length={6} />
      </div>
    )
  },
}

export const Accessibility: Story = {
  render: function Render() {
    const [value, setValue] = useState('')
    return (
      <OtpInput
        id="otp-a11y"
        value={value}
        onChange={setValue}
        autoFocus
        aria-invalid={value.length > 0 && value.length < 6}
        aria-describedby="otp-hint"
      />
    )
  },
  ...a11yStoryParameters,
}
