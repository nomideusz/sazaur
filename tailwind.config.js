/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'
import typography from '@tailwindcss/typography'
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1440px'
      }
    },
    extend: {
      colors: {
        magnum: {
          '50': '#fff9ed',
          '100': '#fef2d6',
          '200': '#fce0ac',
          '300': '#f9c978',
          '400': '#f7b155',
          '500': '#f38d1c',
          '600': '#e47312',
          '700': '#bd5711',
          '800': '#964516',
          '900': '#793a15',
          '950': '#411c09'
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol'
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'SF Mono',
          'Menlo',
          'Consolas',
          'Liberation Mono',
          'monospace'
        ],
        display: ['Deadknight', 'sans-serif']
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            code: {
              position: 'relative',
              borderRadius: theme('borderRadius.md')
            }
          }
        }
      })
    }
  },   
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui"),
    typography,
    plugin(function ({ addVariant, matchUtilities, theme }) {
      addVariant('hocus', ['&:hover', '&:focus'])
      // Square utility
      matchUtilities(
        {
          square: (value) => ({
            width: value,
            height: value
          })
        },
        { values: theme('spacing') }
      )
    })
  ],
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          // "primary": "#8FBF9F",
          // "primary-content": "#f38d1c",
          // "secondary": "##f38d1c",
          // "secondary-content": "#24613b",
          // "neutral": "#F5ECD7",
          // "neutral-content": "#5f5f5f",
          // "accent": "#F18F01",
          // "base-100": "#F5ECD7",
          // "base-200": "#ebe2cd",
          // "base-300": "#c2baa6",
          // "base-content": "#353535",
          // "success": "#37d399",
          // "error": "#f77272",
          "primary": "#bd5711",
          "primary-content": "#e0e0e0",
          "secondary": "#f38d1c",
          "secondary-content": "#9b9b9b",
          "neutral": "#9b9b9b",
          "neutral-content": "#F5ECD7",
          "accent": "#F18F01",
          "base-100": "#161616",
          "base-200": "#2c2c2c",
          "base-300": "#2c2c2c",
          "base-content": "#e0e0e0",
          "success": "#37d399",
          "success-content": "#24613b",
          "error": "#f77272",
        },
      },
      "light",
    ],
  }
}

// --primary:#8FBF9F;
// --secondary:#68a67d;
// --primary:#24613b;
// --accent-100:#F18F01;
// --accent-200:#833500;
// --text-100:#353535;
// --text-200:#5f5f5f;
// --base-100:#F5ECD7;
// --base-200:#ebe2cd;
// --base-300:#c2baa6;
  

// --primary-100:#FFFFFF;
// --primary-200:#e0e0e0;
// --primary-300:#9b9b9b;
// --accent-100:#7F7F7F;
// --accent-200:#ffffff;
// --text-100:#FFFFFF;
// --text-200:#777777;
// --bg-100:#000000;
// --bg-200:#161616;
// --bg-300:#2c2c2c;
  