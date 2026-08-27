import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1A73E8",
          "blue-hover": "#1557B0",
          "blue-light": "#E8F0FE",
          teal: "#00A884",
          "teal-hover": "#008F70",
          "teal-light": "#E6F6F2",
          dark: "#1E293B",
          darker: "#0F172A",
          canvas: "#F8FAFC",
          panel: "#F0F4F9",
        },
        cbt: {
          answered: "#16A34A",
          notAnswered: "#DC2626",
          marked: "#7C3AED",
          notVisited: "#94A3B8",
          notVisitedBg: "#E2E8F0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
