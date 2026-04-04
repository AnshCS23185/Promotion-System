export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        brand: {
          taupe: "#BBA38E",
          cream: "#E6D7BE",
          black: "#070705",
          maroon: "#7D0809",
          crimson: "#9A1815",
        },
      },
      boxShadow: {
        glow:    "0 0 32px 0 rgba(99,102,241,0.20)",
        "glow-sm": "0 0 16px 0 rgba(99,102,241,0.15)",
      },
      animation: {
        blob: "blob 7s infinite",
        "fade-in":  "fadeIn 0.5s ease-out both",
        "slide-up": "slideUp 0.5s ease-out both",
        "scale-in": "scaleIn 0.4s ease-out both",
      },
      keyframes: {
        blob: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%":     { transform: "translate(30px,-50px) scale(1.1)" },
          "66%":     { transform: "translate(-20px,20px) scale(0.9)" },
        },
        fadeIn: {
          from: { opacity: 0 },
          to:   { opacity: 1 },
        },
        slideUp: {
          from: { opacity: 0, transform: "translateY(24px)" },
          to:   { opacity: 1, transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: 0, transform: "scale(0.93)" },
          to:   { opacity: 1, transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};