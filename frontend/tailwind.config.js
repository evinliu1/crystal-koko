/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        wobble: "scale 8s ease-in-out infinite", // Chaining both animations
      },
      keyframes: {
        scale: {
          '0%': { transform: 'scale(1)' },
          '33%': { transform: 'scale(1.005)' },
          '66%': { transform: 'scale(0.995)' },  // Scaling up to 1.1x
          '100%': { transform: 'scale(1)' },     // Back to normal size
        }
      },
    },
  },
  plugins: [],
}