/** @type {import('tailwindcss').Config} */
/* eslint global-require: off, import/no-extraneous-dependencies: off */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],

  theme: {
    extend: {
      colors:{
        lightWhite:'#F1F1F1',
        lightGreen:'#00C976',
        skyBlue:'#085DFF',
        greenBlue:'#6BD2D7'

},
fontFamily: {
  montserrat: ['Montserrat', 'sans-serif'],
},
    },
  },
  // plugins: [require('tailwindcss'), require('autoprefixer')],

}

