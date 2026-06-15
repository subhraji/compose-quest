import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Compose Quest brand palette
        quest: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1", // primary indigo
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        spark: {
          400: "#fbbf24",
          500: "#f59e0b", // achievement gold
          600: "#d97706",
        },
        mint: {
          400: "#34d399",
          500: "#10b981", // success / completed
          600: "#059669",
        },
        coral: {
          400: "#fb7185",
          500: "#f43f5e", // attention / mistakes
        },
        ink: {
          DEFAULT: "#0f1226",
          soft: "#1c1f3a",
          muted: "#6b7194",
        },
        cloud: "#f7f8fc",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 4px 24px -8px rgba(79,70,229,0.18)",
        float: "0 12px 48px -12px rgba(79,70,229,0.28)",
        glow: "0 0 0 4px rgba(99,102,241,0.15)",
      },
      backgroundImage: {
        "quest-gradient": "linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#ec4899 100%)",
        "sky-gradient": "linear-gradient(180deg,#eef2ff 0%,#f7f8fc 100%)",
        "spark-gradient": "linear-gradient(135deg,#fbbf24 0%,#f59e0b 100%)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pop: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "60%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pop: "pop 0.4s cubic-bezier(0.22,1,0.36,1)",
      },
    },
  },
  plugins: [],
};

export default config;
