/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./*.js",
    "./src/*.css"
  ],
  theme: {
    extend: {
      colors: { 
        primary: "#6366f1", 
        secondary: "#a855f7" 
      }
    },
  },
  plugins: [],
}

