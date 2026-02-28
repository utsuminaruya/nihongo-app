import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sakura: {
          50: "#fef2f4",
          100: "#fde6e9",
          200: "#fbd0d8",
          300: "#f8a9b8",
          400: "#f27a93",
          500: "#E74860",
          600: "#d32a4a",
          700: "#b11e3c",
          800: "#941c38",
          900: "#7e1b35",
        },
        navy: {
          50: "#e8e8f0",
          100: "#c5c5d8",
          200: "#9e9ebd",
          300: "#7676a2",
          400: "#55558e",
          500: "#35357a",
          600: "#2a2a5e",
          700: "#222248",
          800: "#1A1A2E",
          900: "#12121f",
        },
        gold: {
          50: "#fffce8",
          100: "#fff8c2",
          200: "#fff089",
          300: "#ffe44b",
          400: "#FFD700",
          500: "#e6c200",
          600: "#c99900",
          700: "#a17000",
          800: "#845800",
          900: "#6e4800",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans JP", "sans-serif"],
        jp: ["Noto Sans JP", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
