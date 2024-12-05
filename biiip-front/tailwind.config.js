/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    // Ajoutez tous les chemins vers vos fichiers
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        principale: '#2E86AB',
        fond: '#F0F0F0',
      },
    },
  },
  plugins: [],
};

