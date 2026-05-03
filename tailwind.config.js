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
          50: '#FFF1EC',
          100: '#FFD4C6',
          200: '#FFB099',
          300: '#FF855F',
          400: '#FF5F2D',
          500: '#FF4A00',
          600: '#E84200',
          700: '#C23600',
          800: '#9A2B00',
          900: '#7A2200',
        },
      },
      boxShadow: {
        'gold-glow': '0 0 0 1px rgba(255,74,0,0.35), 0 14px 50px rgba(255,74,0,0.22)',
        'soft': '0 18px 60px rgba(0,0,0,0.55)',
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(900px 520px at 75% 15%, rgba(255,74,0,0.16), transparent 62%), radial-gradient(820px 520px at 15% 40%, rgba(255,255,255,0.06), transparent 60%)',
      },
    },
  },
  plugins: [],
}
