/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        optum: {
          orange: '#FF6200',
          blue: '#002677',
          lightblue: '#1192E8',
          gray: '#F4F4F4'
        }
      }
    },
  },
  plugins: [],
}