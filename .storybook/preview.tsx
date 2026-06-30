import type { Preview } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import '../src/index.css'

const preview: Preview = {
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="min-h-[120px] bg-ink p-6 text-sand">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'fullscreen',
    a11y: {
      test: 'todo',
    },
  },
}

export default preview
