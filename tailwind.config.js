/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui")
  ],
  daisyui: {
    darkTheme: "business",
    themes: [
      "business",
      "nord",
      "dark",
      "light",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "sunset",
      {
        saasstartertheme: {
          "primary": "#180042",
          "primary-content": "#fefbf6",
          "secondary": "#c7b9f8",
          "neutral": "#180042",
          "neutral-content": "#fefbf6",
          "accent": "#db2777",
          "accent-content": "#180042",
          "base-content": "#180042",
          "base-100": "#fefbf6",
          "base-200": "#faedd6",
          "success": "#37d399",
          "error": "#f77272",
        },
      }
    ],
  }
}
