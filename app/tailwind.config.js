/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#408c3a',
        'bg-form-field-bg': '#fff',
        'border-color': '#E7E8E5',
      },
    },
  },
  prefix: '',
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant(
        'mobile-only',
        "@media screen and (max-width: theme('screens.sm'))",
      )
    }),
  ],
}
