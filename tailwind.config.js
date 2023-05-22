/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'color-sidebar': '#5C6A6C',
        'buttom-sidebar': '#67CCC1',
        'buttom-hover-sidebar': '#4294AB',
        'buttom-logout-sidebar': '#667D80',
        'buttom-logout-hover-sidebar': '#48524E',
      }
    },
  },
  plugins: [],
}
