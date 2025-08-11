export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Bahnschrift", "'DIN Alternate'", "'Franklin Gothic Medium'", "'Arial Narrow'", "sans-serif"],
      },
      colors: {
        brand: "#ee9e46",
        black: "#000000",
        gray: "#777777",
        white: "#ffffff",
      },
    },
  },
  plugins: [],
};
