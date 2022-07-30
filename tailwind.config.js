/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'white': '#FFFFFF',
        'gray-50': '#FAFAFA'
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
  safelist: [
    'lg:container',
    'md:container',
    'sm:container',
    '2xl:container',
  ]
}
