/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    'components/**/*.{vue,js}',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'composables/**/*.{js,ts}',
    'plugins/**/*.{js,ts}',
    'App.{js,ts,vue}',
    'app.{js,ts,vue}',
    'nuxt.config.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Quicksand'", ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')]
}
