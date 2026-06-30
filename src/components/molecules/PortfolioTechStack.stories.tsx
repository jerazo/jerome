import type { Meta, StoryObj } from '@storybook/react-vite'
import { a11yStoryParameters } from '../../stories/storyParameters'
import { PortfolioTechStack } from './PortfolioTechStack'

const meta = {
  title: 'Molecules/PortfolioTechStack',
  component: PortfolioTechStack,
  tags: ['autodocs'],
} satisfies Meta<typeof PortfolioTechStack>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tags: ['React', 'TypeScript', 'AWS'],
  },
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <PortfolioTechStack tags={['React', 'TypeScript']} />
      <PortfolioTechStack
        tags={['Node.js', 'PostgreSQL', 'Docker', 'Kubernetes', 'Terraform']}
        className="max-w-sm"
      />
    </div>
  ),
}

export const Accessibility: Story = {
  args: {
    tags: ['React', 'TypeScript', 'Accessibility'],
  },
  ...a11yStoryParameters,
}
