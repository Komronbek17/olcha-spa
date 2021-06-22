// import nuxtConfig from './nuxt.config'
const colors = require('tailwindcss/colors')
// const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'mobile/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        loading: 'url(@/assets/images/loading.svg)'
      }),
      gridTemplateRows: {
        7: 'repeat(7, minmax(0, 1fr))',
        8: 'repeat(8, minmax(0, 1fr))',
        9: 'repeat(9, minmax(0, 1fr))'
      },
      gridRow: {
        'span-7': 'span 7 / span 7',
        'span-8': 'span 8 / span 8',
        'span-9': 'span 9 / span 9'
      },
      keyframes: {
        loading: {
          '0%': { 'margin-left': '0' },
          '50%': { 'margin-left': '-100px' },
          '100%': { 'margin-left': '0' }
        }
      },
      animation: {
        loading: 'loading 1s ease-in-out infinite'
      },
      spacing: {
        15: '3.75rem',
        22: '5.5rem',
        34: '8.5rem',
        42: '10.5rem'
      },
      minWidth: {
        38: '9.5rem',
        52: '13rem'
      },
      boxShadow: {
        'c-sm': ' 0px 2px 15px rgba(0, 0, 0, 0.2)'
      },
      letterSpacing: {
        wided: '.4rem'
      },
      fontSize: {
        '3.5xl': '1.875rem'
      },
      borderWidth: {
        6: '6px'
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: '#0067dd',
      'c-pink': {
        1: '#ff99aa'
      },
      'c-black': {
        1: '#000',
        2: '#333333'
      },
      'c-orange': {
        1: '#ff730b',
        2: '#FFA234'
      },
      'c-gray': {
        1: '#f8f8f8',
        2: '#ededed',
        3: '#e0e0e0',
        4: '#c1c1c1',
        5: '#8a8a8a',
        6: '#333',
        7: 'rgba(51, 51, 51, 0.1)',
        8: '#f5f5f5'
      },
      'c-green': {
        1: '#12bf6c',
        2: '#67d9a2',
        3: '#43B794',
        4: 'rgba(255, 255, 255, 0.1)',
        5: 'rgba(18, 191, 108, 0.08)'
      },
      'c-red': {
        1: '#eb1537',
        2: 'rgba(235, 21, 55, 0.2)',
        3: 'rgba(235, 21, 55, 0.8)'
      },
      'c-blue': {
        1: '#0067DD',
        2: 'rgba(0, 103, 221, 0.08)',
        3: '#009CE7',
        4: '#2BA2DF'
      },

      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      green: colors.emerald,
      blue: colors.blue,
      purple: colors.violet,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber
    },
    fontFamily: {
      helvetica: ['Arial', 'Helvetica', 'sans-serif']
    },
    fontWeight: {
      hairline: 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      'font-550': 550,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    },
    boxShadow: {
      1: '0 2px 15px rgba(0, 0, 0, 0.2)',
      2: '-2px 0px 2px rgba(0, 0, 0, 0.15)'
    },
    screens: {
      sm: '576px',
      // => @media (min-width: 576px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '992px',
      // => @media (min-width: 992px) { ... }

      xl: '1200px',
      // => @media (min-width: 1200px) { ... }

      '2xl': '1400px'
      // => @media (min-width: 1400px) { ... }
    }

  },
  variants: {
    extend: {}
  },
  corePlugins: {
    container: false
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class'
    }),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          paddingRight: '1rem',
          paddingLeft: '1rem',
          '@screen sm': {
            maxWidth: '540px',
            paddingRight: '1rem',
            paddingLeft: '1rem'
          },
          '@screen md': {
            maxWidth: '720px',
            paddingRight: '1rem',
            paddingLeft: '1rem'
          },
          '@screen lg': {
            maxWidth: '960px',
            paddingRight: '1rem',
            paddingLeft: '1rem'
          },
          '@screen xl': {
            maxWidth: '1140px',
            paddingRight: '1rem',
            paddingLeft: '1rem'
          },
          '@screen 2xl': {
            maxWidth: '1320px',
            paddingRight: '1rem',
            paddingLeft: '1rem'

          }
        }
      })
    }
  ]
}
