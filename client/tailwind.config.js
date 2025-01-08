/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "card": "repeat(auto-fill, minmax(150px, 1fr))"
      },
    },
  },
  plugins: [],
}

