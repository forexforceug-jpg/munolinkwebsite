// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F2F5F',
        accent: '#4A7DFF',
        background: '#F5F6FA',
        border: '#DCE5FF',
        muted: '#8E99B3',
        text: '#1F2F5F',
        white: '#FFFFFF',
        success: '#4CAF50',
        danger: '#F44336',
        warning: '#FF9800',
      },
      fontFamily: {
        primary: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}