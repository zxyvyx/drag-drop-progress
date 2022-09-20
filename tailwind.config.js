/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      letterSpacing: {
        default: "0.005em",
      },
      lineHeight: {
        default: "140%",
      },
      colors: {
        neutralLight: "#F5F7F8",
        neutralDark: "#263238",
        neutralDefault: "#607D8B",
        primaryLight: "#F1F8FE",
        primaryBright: "#90CAF9",
        primaryDefault: "#2196F3",
        primaryDark: "#0D47A1",
      },
    },
  },
  plugins: [],
};
