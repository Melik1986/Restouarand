/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: "#C5A059",
          light: "#D4B87A",
          dark: "#A38240",
          contrastText: "#FFFFFF"
        },
        background: {
          primary: "#0F0F0F",
          secondary: "#1A1A1A",
          overlay: "rgba(0, 0, 0, 0.7)"
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#B0B0B0",
          muted: "#666666"
        },
        semantic: {
          accent: "#D32F2F"
        }
      },
      fontFamily: {
        primary: ["'Montserrat'", "sans-serif"],
        headings: ["'Playfair Display'", "serif"],
        script: ["'Great Vibes'", "cursive"]
      },
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1280px',
        },
      },
      fontSize: {
        'hero-title': 'clamp(3rem, 8vw, 6rem)',
      }
    },
  },
  plugins: [],
}
