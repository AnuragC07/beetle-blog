/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ["PT Serif", "sans-serif"],
        subtitle: ["Poppins", "sans-serif"],
        stylish: ["Satisfy", "sans-serif"],
        hero: ["Open Sans", "sans-serif"],
        bit: ["Bitcount Grid Single", "sans-serif"]
      },
    },
  },
  plugins: [],
}

