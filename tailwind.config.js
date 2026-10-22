// ==============================================================
// FOLDER: mini-app-frontend
// FILE: tailwind.config.js
// ==============================================================
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        eotcGreen: "#0F8A52",
        eotcGold: "#D49A1F",
        darkBg: "#0B120E",
        darkCard: "#131E18",
        darkBorder: "#2E4538"
      }
    },
  },
  plugins: [],
}