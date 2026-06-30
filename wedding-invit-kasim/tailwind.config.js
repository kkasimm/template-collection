/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        spotify: {
          green: '#1DB954',
          greenLight: '#1ed760',
          dark: '#121212',
          card: '#181818',
          gray: '#A7A7A7',
        },
      },
    },
  },
  plugins: [],
}