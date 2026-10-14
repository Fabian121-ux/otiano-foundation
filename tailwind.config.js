/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#DC2626',
          hover: '#B91C1C',
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: { card: '0.75rem' },
      boxShadow: { card: '0 8px 28px rgb(23 23 23 / 0.08)' },
    },
  },
}
