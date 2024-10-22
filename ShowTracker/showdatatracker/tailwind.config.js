/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "public/index.html"],
  theme: {
    extend: {
      backgroundImage: {
        bg: "url('/src/bg.png')",
      },
    },
  },
  plugins: [],
};
