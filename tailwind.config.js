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
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          // "primary": "#8FBF9F",
          // "primary-content": "#24613b",
          // "secondary": "#68a67d",
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
          "primary": "#8FBF9F",
          "primary-content": "#24613b",
          "secondary": "#68a67d",
          "secondary-content": "#24613b",
          "neutral": "#F5ECD7",
          "neutral-content": "#5f5f5f",
          "accent": "#F18F01",
          "base-100": "#161616",
          "base-200": "#2c2c2c",
          "base-300": "#2c2c2c",
          "base-content": "#e0e0e0",
          "success": "#37d399",
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
  