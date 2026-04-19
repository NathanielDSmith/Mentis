/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mentis: {
          bg: '#08080f',
          surface: '#0f0f1a',
          'surface-hover': '#141428',
          border: '#1e1e3a',
          text: '#e2e2f0',
          muted: '#5a5a8a',
          accent: '#7c6fff',
          'accent-dim': '#5b4fd9',
          correct: '#22c55e',
          wrong: '#ef4444',
        },
      },
    },
  },
  plugins: [],
}
