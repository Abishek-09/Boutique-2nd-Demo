/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          deep: '#174A43',
          dark: '#123632',
        },
        forest: '#123632',
        terracotta: '#C8906D',
        copper: '#A95732',
        champagne: '#DBC3A5',
        ivory: '#F9F6F0',
        espresso: '#383028',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'serif'],
        sans: ['Inter', 'Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(23, 74, 67, 0.15)',
        'copper': '0 10px 25px -5px rgba(169, 87, 50, 0.35)',
        'soft': '0 8px 30px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
