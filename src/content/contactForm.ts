import { defaultPhoneCountry } from './countryDialCodes'

export type ContactFormField = {
  id: Exclude<keyof ContactFormValues, 'phoneCountry' | 'honeypot'>
  label: string
  type: 'text' | 'email' | 'tel' | 'url' | 'textarea'
  placeholder: string
  required?: boolean
  rows?: number
  layout: 'pair' | 'full'
}

export type ContactFormValues = {
  name: string
  email: string
  phoneCountry: string
  phone: string
  websiteUrl: string
  company: string
  message: string
  honeypot: string
}

export const contactFormFields: ContactFormField[] = [
  {
    id: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Your name',
    required: true,
    layout: 'pair',
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'you@company.com',
    required: true,
    layout: 'pair',
  },
  {
    id: 'phone',
    label: 'Contact number',
    type: 'tel',
    placeholder: '400 000 000',
    layout: 'full',
  },
  {
    id: 'websiteUrl',
    label: 'Website',
    type: 'url',
    placeholder: 'https://yourcompany.com',
    layout: 'pair',
  },
  {
    id: 'company',
    label: 'Company',
    type: 'text',
    placeholder: 'Optional',
    layout: 'pair',
  },
  {
    id: 'message',
    label: 'What are you building?',
    type: 'textarea',
    placeholder: 'Goal, timeline, constraints, links…',
    required: true,
    rows: 5,
    layout: 'full',
  },
]

export const emptyContactFormValues = (): ContactFormValues => ({
  name: '',
  email: '',
  phoneCountry: defaultPhoneCountry,
  phone: '',
  websiteUrl: '',
  company: '',
  message: '',
  honeypot: '',
})
