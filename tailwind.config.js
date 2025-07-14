/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/renderer/src/index.html',
    './src/renderer/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {} // no customizations
  },
  plugins: ['tailwind-scrollbar']
}
