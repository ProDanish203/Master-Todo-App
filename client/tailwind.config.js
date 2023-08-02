/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        primary: "#3c2c59",
        secondary: "#c7bbdd",
        tertiary: "#151030",
        accent: "#5d4389",
        text: "#150f1f",
        background: "#e3ddee",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xsm: "550px",
        xs: "450px",
      }
    },
  },
  plugins: [],
}

