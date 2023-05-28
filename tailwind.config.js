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
        'green-color': '#248068',
        'green-hover': '#2EA082',
        'base-color': '#515760',
        'pagination-link-hover': '#f0f0f0',
      }
    },
    
  },
  plugins: [],
}
