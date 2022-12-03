/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    colors: {
      midnight: "#2D033B",
      purple: {
        light: "#810CA8",
        dark: "#540375",
      },
      orange: "#FF7000",
      yellow: "#FFBF00",
      green: "#06FF00",
      red: "#CF0A0A",
      white: "#ffffff",
      disabled: "#D6E4E5",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("tw-elements/dist/plugin")],
};
