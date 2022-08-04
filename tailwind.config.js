/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const daisyTheme = require('daisyui/src/colors/themes')
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
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...daisyTheme['[data-theme=cupcake]']
        }
      },
      {
        dark: {
          // ...daisyTheme['[data-theme=night]'],
          primary: '#b26c1c',
          secondary: '#ff26e2',
          accent: '#fc53f9',
          neutral: '#2B1D2F',
          'base-100': '#463C5D',
          info: '#79B5D7',
          success: '#59DEBD',
          warning: '#AB7A07',
          error: '#F35868'
        }
      }
    ]
  }
}
