/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          300: "#CCCCCC",
          500: "#F2F2F2",
          400: "#333333",
          600: '#B3B3B3',
          700: '#4F4F4F',
        },
        white: "#FFFFFF",
        green: "#186F3D",
        orange: "#FFE0B2",
        shadow: "rgba(51, 51, 51, 0.16)",
        blackTransparent: "rgba(0, 0, 0, 0.6)",
        yellow: "#E6911F",
        placeholder: "#999999",
      },
    },
  },
  plugins: [],
}

