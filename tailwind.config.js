/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "staggered-fade": "staggerFade 1.5s ease-in-out forwards",
        "fade-in-delay": "fadeIn 1.5s 0.5s ease-in-out forwards",
        "rotate-in": "rotateIn 1.5s ease-out forwards",
        "hover-glow": "hoverGlow 1.5s infinite alternate",
        "text-slide-in": "slideIn 1.2s ease-out forwards",
      },
      keyframes: {
        staggerFade: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        rotateIn: {
          "0%": { opacity: 0, transform: "rotate(-10deg)" },
          "100%": { opacity: 1, transform: "rotate(0deg)" },
        },
        hoverGlow: {
          "0%": { boxShadow: "0 0 10px rgba(0, 0, 0, 0)" },
          "100%": { boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)" },
        },
        slideIn: {
          "0%": { opacity: 0, transform: "translateX(-50px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
}