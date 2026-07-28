import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)", "sans-serif"],
        heading: ["var(--font-montserrat)", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        bordeaux: {
          50: "#FAF0F2",
          100: "#F5E1E5",
          200: "#ECC4CB",
          300: "#DF98A6",
          400: "#CE657C",
          500: "#BA3C57",
          600: "#9E2740",
          700: "#801A2F",
          800: "#641122",
          900: "#4A0B18",
          950: "#2D050D",
          990: "#1E0409",
        },
      },
    },
  },
  plugins: [],
};
export default config;
