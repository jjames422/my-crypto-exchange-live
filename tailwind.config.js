module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        wakeforest: {
          100: '#f3d9dc',
          200: '#e5b3b9',
          300: '#d68c95',
          400: '#c86672',
          500: '#ba404f',
          600: '#9b3340',
          700: '#7d2631',
          800: '#5e1922',
          900: '#3f0d13',
        },
      },
    },
  },
  plugins: [],
};
