/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '360px', // Added a custom screen size
      },
      colors: {
        gray: {
          200: "#FBFBFB",
          300: "#CCCCCC",
          400: "#333333",
          500: "#F2F2F2",
          600: '#B3B3B3',
          700: '#4F4F4F',
          800: '#242424',
          900: '#696969'
        },
        white: "#FFFFFF",
        green: "#186F3D",
        orange: "#FFE0B2",
        shadow: "rgba(51, 51, 51, 0.16)", // Custom shadow color
        blackTransparent: "rgba(0, 0, 0, 0.6)", // Custom transparent black
        yellow: "#E6911F",
        placeholder: "#999999", // Custom placeholder color
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
      },
      animation: {
        slideInRight: 'slideInRight 0.5s forwards',
        slideOutRight: 'slideOutRight 0.5s forwards',
      },
      fontFamily: {
        sans: ['Lexend', 'DM Sans', 'Lato', 'Poppins', 'Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
