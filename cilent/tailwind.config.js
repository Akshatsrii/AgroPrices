/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f0f7f2",
          100: "#dcefe3",
          200: "#b9dfc7",
          300: "#80c0a0",
          400: "#4da07a",
          500: "#2d8058",
          600: "#1e6644",
          700: "#174f35",
          800: "#123c29",
          900: "#0c281c",
        },
        cream: "#fdf8f0",
      },
    },
  },
  plugins: [],
}