import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        marker: ["var(--font-marker)", "cursive"],
      },
      colors: {
        ink: "rgb(28 25 23)",
        "ink-soft": "rgb(68 64 60)",
      },
    },
  },
  plugins: [],
} satisfies Config;
