/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#00D4FF", // Neon Blue
        secondary: "#FF6B95", // Neon Pink
        dark: "#0A0F1C", // Deep Dark Blue
        "dark-paper": "#1A1F2E", // Slightly Lighter Dark Blue
        light: "#f8fafc", // Slate 50
        "light-paper": "#ffffff", // White
        "text-primary-light": "#0f172a", // Slate 900
        "text-secondary-light": "#475569", // Slate 600
      },
      fontFamily: {
        sans: ['"Inter"', '"Roboto"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      }
    },
  },
  plugins: [],
}
