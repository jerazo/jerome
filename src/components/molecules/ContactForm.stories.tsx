import type { Meta, StoryObj } from '@storybook/react-vite'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { ContactForm } from './ContactForm'

const meta = {
  title: 'Molecules/ContactForm',
  component: ContactForm,
  tags: ['autodocs'],
} satisfies Meta<typeof ContactForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Variants: Story = {
  render: () => (
    <div className="max-w-lg space-y-6">
      <ContactForm id="contact-form-default" />
      <ContactForm id="contact-form-alt" className="rounded-2xl border border-sand/10 p-4" />
    </div>
  ),
}

export const Accessibility: Story = {
  args: {
    id: 'contact-form-a11y',
  },
  ...a11yStoryParameters,
}
