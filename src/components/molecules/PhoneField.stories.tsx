import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { PhoneField } from './PhoneField'

const meta = {
  title: 'Molecules/PhoneField',
  component: PhoneField,
  tags: ['autodocs'],
} satisfies Meta<typeof PhoneField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render() {
    const [countryCode, setCountryCode] = useState('US')
    const [nationalNumber, setNationalNumber] = useState('')
    return (
      <PhoneField
        countryCode={countryCode}
        nationalNumber={nationalNumber}
        onCountryChange={setCountryCode}
        onNationalNumberChange={setNationalNumber}
      />
    )
  },
}

export const Variants: Story = {
  render: function Render() {
    const [countryCode, setCountryCode] = useState('GB')
    const [nationalNumber, setNationalNumber] = useState('7700900000')
    return (
      <div className="space-y-4 max-w-md">
        <PhoneField
          countryCode={countryCode}
          nationalNumber={nationalNumber}
          onCountryChange={setCountryCode}
          onNationalNumberChange={setNationalNumber}
        />
        <PhoneField
          countryCode="US"
          nationalNumber=""
          onCountryChange={() => undefined}
          onNationalNumberChange={() => undefined}
          placeholder="Optional phone"
        />
        <PhoneField
          countryCode="US"
          nationalNumber="123"
          onCountryChange={() => undefined}
          onNationalNumberChange={() => undefined}
          error="Enter a valid phone number"
        />
      </div>
    )
  },
}

export const Accessibility: Story = {
  render: function Render() {
    const [countryCode, setCountryCode] = useState('US')
    const [nationalNumber, setNationalNumber] = useState('')
    return (
      <PhoneField
        countryCode={countryCode}
        nationalNumber={nationalNumber}
        onCountryChange={setCountryCode}
        onNationalNumberChange={setNationalNumber}
        countrySelectId="phone-country-a11y"
        phoneInputId="phone-number-a11y"
      />
    )
  },
  ...a11yStoryParameters,
}
