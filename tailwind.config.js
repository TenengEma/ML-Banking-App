/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: { 50: '#fdf9f1', 100: '#f7efe2' },
        sand: { 50: '#f6f1e9', 300: '#d9c8ad', 400: '#bba585' },
        clay: { 700: '#8a5a44' },
        terracotta: { 500: '#b85f3d', 600: '#a34f2f' },
        olive: { 500: '#7f7c4f' },
        charcoal: { 600: '#51443a', 700: '#3b3129', 800: '#342a23', 900: '#2d2620' },
      },
      boxShadow: {
        soft: '0 10px 30px rgba(88, 63, 44, 0.12)',
      },
    },
  },
  plugins: [],
}
