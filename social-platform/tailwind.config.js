/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Ensure this is set to 'class'
  theme: {
    extend: {
      colors: {
        // You can define custom dark mode colors here if needed
      },
    },
  },
  plugins: [],
};
