/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mentis: {
          bg:              '#070b14',  // midnight navy — warm dark, not void black
          surface:         '#0d1426',  // raised surface
          'surface-hover': '#111d35',  // hover state
          border:          '#1e2d4a',  // navy border
          text:            '#e8eaf0',  // off-white, slight warmth
          muted:           '#637089',  // blue-grey, readable
          accent:          '#10d9a0',  // mint-emerald — growth, progress
          'accent-dim':    '#0bb885',  // hover/pressed accent
          correct:         '#22c55e',  // green
          wrong:           '#ef4444',  // red
        },
      },
    },
  },
  plugins: [],
}
