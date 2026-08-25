/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // Default blue-600, adjust to your design
        'primary-dark': '#1e40af', // Darker shade, adjust as needed
      },
    },
  },
  plugins: [],
};
