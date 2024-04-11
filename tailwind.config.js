/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
    fontFamily: {
      display: ['Deadknight', 'sans-serif']
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui")
  ],
  daisyui: {
    
    darkTheme: "business",
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "primary": "#8c6f87",
          "primary-content": "#f2f2f2",
          "secondary": "#cccbb8",
          "neutral": "#333",
          "neutral-content": "#fefbf6",
          "accent": "#f43e5c",
          "base-100": "#141414",
          "base-200": "#222",
          "base-content": "#f2f2f2",
          "success": "#37d399",
          "error": "#f77272",
        },
      },
      "light",


    ],
  }
}