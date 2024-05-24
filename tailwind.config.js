/** @type {import('tailwindcss').Config} */
export default {
  content:  [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark": "#222222",
        "action": "#E0B531",
        "white": "#FFFFFF"
      },
      backgroundImage: {
        "Hero": "url('/src/assets/home.jpg')",
        "Horario": "url('/src/assets/bg-horarios.jpg')"
      }
    },
  },
  plugins: [],
}

