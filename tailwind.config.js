/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'color-background-buttom': '#5C6A6C',
        'color-sidebar': '#515760',
        'buttom-sidebar': '#248068',
        'buttom-sidebar-active': '#248090',
        'buttom-hover-sidebar': '#2EA082',
        'buttom-logout-sidebar': '#667D80',
        'buttom-logout-hover-sidebar': '#48524E',
        'green-color': '#248068',
        'green-hover': '#2EA082',
        'base-color': '#515760',
        'pagination-link-hover': '#f0f0f0',
      },
    },
  },
  plugins: [],
};
