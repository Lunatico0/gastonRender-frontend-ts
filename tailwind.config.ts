/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "titleFont": "'Josefin Sans', sans-serif",
      },
      colors: {
        "primary": "#9e8b76",
        "secondary": "#5a4f42",
        "logo": '#cda151',
        "textDark": '#100e10',
        "textLight": '#fcfcfc',
        "light": '#fcfcfc',
        "dark": '#333333',
        "gris": "#424242",
        "acento": "#3dd1ff",
        "menu": "#7b5b21",
      },
    },
  },
  plugins: [],
};
