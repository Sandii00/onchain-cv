import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Syne", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        accent: "#7C3AED",
        "accent-cyan": "#06B6D4",
        "badge-gold": "#F59E0B",
        bg: "#F5F4F0",
      },
      backdropBlur: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "40px",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
        "glass-lg": "0 20px 60px rgba(124,58,237,0.35)",
        card: "0 2px 12px rgba(0,0,0,0.05)",
      },
      animation: {
        "spin-slow": "spin 1.2s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
