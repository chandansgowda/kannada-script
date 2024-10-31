module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bhagwa": {
        700: "#ffd700",
        600: "#ffdb58",
        500: "#ffeb73",
        400: "#fff99d",
        300: "#fffdc4",
        },
        "background": "#121121",
        "editorBackground": "#333",
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
