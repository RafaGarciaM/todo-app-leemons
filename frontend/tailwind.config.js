/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {},
    keyframes: {
      fly: {
        '0%': { transform: 'translateY(0.1em)' },
        '100%': { transform: 'translateY(-0.1em)' }
      }
    },
    animation: {
      fly: 'fly 600ms ease-in-out infinite alternate'
    }
  },
  plugins: [require('@headlessui/tailwindcss')]
}
