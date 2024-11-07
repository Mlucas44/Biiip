module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F2B53',
        secondaire: {
          rouge: '#DD2C3A',
          'bleu-clair': '#4C9CD6',
        },
        accentuation: '#FBBB45',
        fond: '#F1F9FB',
      },
    },
  },
  plugins: [],
};
