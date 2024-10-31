module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bhagwa": {
        700: "#8B0000",
        600: "#B22222",
        500: "#CD5C5C",
        400: "#E9967A",
        300: "#F08080",
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
