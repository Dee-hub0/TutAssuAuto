/** @type {import('tailwindcss').Config} */

export default {
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        'theme-violet' : '#6d4ae7',
        'theme-gray': '#b3b3b3',
        'theme-grey': '#b7b7b7',
        'theme-red-gray': '#f7f5f5'
      },
      fontSize:{
        'theme-xs' : '0.6rem',
      }
    },

  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  content: [
    "./components/**/*.{js,vue,ts}",
  ]

}