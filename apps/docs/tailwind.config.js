const defaultTheme = require("tailwindcss/defaultTheme");

// Theme follows engineeringinkannada.in: dark surfaces, Karnataka yellow & red
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: "#1A1A1A",
          600: "#2A2A2A",
          700: "#222222",
          800: "#1E1E1E",
          900: "#141414",
          950: "#0F0F0F",
        },
        primary: {
          DEFAULT: "#FFD700",
          light: "#FFE24D",
          deep: "#E6C200",
        },
        kred: {
          DEFAULT: "#E8112D",
          light: "#FF4D63",
        },
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Noto Sans Kannada", ...defaultTheme.fontFamily.sans],
        kannada: ["Noto Sans Kannada", "Plus Jakarta Sans", ...defaultTheme.fontFamily.sans],
        mono: ["JetBrains Mono", "Noto Sans Kannada", ...defaultTheme.fontFamily.mono],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.25s ease-out both",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
