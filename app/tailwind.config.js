/** @type {import('tailwindcss').Config} */

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
  plugins: [],
}
