/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "*.html", "main/*.html", "js/*.js"],
  theme: {
    extend: {
      colors: {
        vanilla: '#f4ece4',
      },
    },
  },
  plugins: [],
}
