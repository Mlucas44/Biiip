const tokens = require('./theme/index');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        ...tokens.colors,
      },
      spacing: {
        ...tokens.spacing,
      },
      fontFamily: {
        ...tokens.fonts,
      },
    },
  },
  plugins: [],
};