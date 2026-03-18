import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ─── Bee Design System Colors ──────────────────────────────────── */
      colors: {
        bee: {
          // Primary palette
          yellow: "#FFD54F",
          "yellow-light": "#FFF8E1",
          "yellow-bright": "#FFEB3B",
          gold: "#F59E0B",
          "gold-dark": "#D97706",
          honey: "#E8A317",

          // Neutrals
          black: "#1A1A1A",
          "black-soft": "#2D2D2D",
          dark: "#3D3200",

          // Surfaces
          cream: "#FFFDE7",
          "cream-warm": "#FFF9E6",
          "cream-deep": "#FFF3C4",
          white: "#FFFFFF",

          // Accents
          amber: "#FFC107",
          "amber-light": "#FFE082",
          "amber-glow": "rgba(255,213,79,0.3)",
        },
      },

      /* ─── Typography ────────────────────────────────────────────────── */
      fontFamily: {
        display: ['"Quicksand"', "sans-serif"],
        body: ['"Nunito"', "sans-serif"],
      },

      /* ─── Box Shadows (Honey Glow) ─────────────────────────────────── */
      boxShadow: {
        "honey-sm": "0 2px 12px rgba(245,158,11,0.15)",
        honey: "0 4px 24px rgba(245,158,11,0.2)",
        "honey-lg": "0 8px 40px rgba(245,158,11,0.25)",
        "honey-glow": "0 0 30px rgba(255,213,79,0.4)",
        "honey-intense": "0 0 50px rgba(255,213,79,0.5)",
      },

      /* ─── Background Gradients ──────────────────────────────────────── */
      backgroundImage: {
        "honey-gradient":
          "linear-gradient(135deg, #FFD54F 0%, #FFC107 50%, #F59E0B 100%)",
        "honey-gradient-soft":
          "linear-gradient(135deg, #FFF8E1 0%, #FFFDE7 30%, #FFF9E6 60%, #FFF3C4 100%)",
        "honey-gradient-radial":
          "radial-gradient(circle, rgba(255,213,79,0.15) 0%, transparent 70%)",
        "bee-stripe":
          "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(26,26,26,0.03) 10px, rgba(26,26,26,0.03) 20px)",
      },

      /* ─── Keyframes ─────────────────────────────────────────────────── */
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        sparkle: "sparkle 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255,213,79,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(255,213,79,0.6)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.8)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
