import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "forest-green": "#0A2F1F", // Deep Forest Green (Text/Borders)
        "electric-lime": "#ccff00", // Neon Electric Lime (Interactive)
        "paper-white": "#f4f4f0", // Clean White / "Offset Paper"
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
