/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Spline Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        ink: '#000000',
        ink2: '#0B0B0B',
        graphite: '#121212',
        sand: '#FFFFFF',
        sand2: '#D6D6D6',
        gold: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
      },
      boxShadow: {
        'gold-glow': '0 0 0 1px rgba(109,40,217,0.35), 0 14px 50px rgba(109,40,217,0.22)',
        'soft': '0 18px 60px rgba(0,0,0,0.55)',
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(900px 520px at 75% 15%, rgba(139,92,246,0.16), transparent 62%), radial-gradient(820px 520px at 15% 40%, rgba(255,255,255,0.06), transparent 60%)',
      },
    },
  },
  plugins: [],
}
