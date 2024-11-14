/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "pertamina-green": "#9DBB00",
        "forest-green": "#48B162",
        "pertamina-blue": "#0077B9",
        "pertamina-red": "#DA251C",
        "pertamina-navy": "#2C607C",
        "pertamina-sky-blue": "#6CBDE8"
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        "lilita-one": ["Lilita One", "sans-serif"]
      }
    },
  },
  plugins: [],
}

