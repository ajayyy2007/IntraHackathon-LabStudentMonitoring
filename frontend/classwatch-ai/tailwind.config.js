/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0a0e14",
          panel: "#11161f",
          card: "#151b26",
        },
        border: {
          DEFAULT: "#212836",
        },
        accent: {
          DEFAULT: "#3b82f6",
          glow: "#60a5fa",
        },
        status: {
          green: "#22c55e",
          yellow: "#eab308",
          red: "#ef4444",
          gray: "#64748b",
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.35)",
        glow: "0 0 20px rgba(59,130,246,0.25)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};