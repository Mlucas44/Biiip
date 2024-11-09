module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F2B53',
        secondary: {
          red: '#3C4043',
          'bleu-clair': '#4C9CD6',
        },
        accentuation: '#FBBB45',
        background: '#F1F9FB',
      },
    },
  },
  plugins: [],
};
