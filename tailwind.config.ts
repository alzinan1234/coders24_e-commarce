import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── GLOBAL THEME TOKENS ─────────────────────────────────────────
        // Change these to instantly retheme the entire site
        primary:     { DEFAULT: "var(--color-primary)",     light: "var(--color-primary-light)",   dark: "var(--color-primary-dark)" },
        secondary:   { DEFAULT: "var(--color-secondary)",   light: "var(--color-secondary-light)" },
        accent:      { DEFAULT: "var(--color-accent)",      light: "var(--color-accent-light)" },
        gold:        { DEFAULT: "var(--color-gold)",        light: "var(--color-gold-light)" },
        surface:     { DEFAULT: "var(--color-surface)",     alt: "var(--color-surface-alt)" },
        ink:         { DEFAULT: "var(--color-ink)",         muted: "var(--color-ink-muted)" },
        border:      { DEFAULT: "var(--color-border)" },
      },
      fontFamily: {
        display:  ["var(--font-display)", "serif"],
        body:     ["var(--font-body)", "sans-serif"],
        mono:     ["var(--font-mono)", "monospace"],
        chinese:  ["var(--font-chinese)", "serif"],
      },
      backgroundImage: {
        "dragon-gradient": "var(--gradient-dragon)",
        "gold-gradient":   "var(--gradient-gold)",
        "silk-gradient":   "var(--gradient-silk)",
      },
      boxShadow: {
        "glow-primary": "0 0 40px var(--color-primary-glow)",
        "glow-gold":    "0 0 30px var(--color-gold-glow)",
        "card":         "0 8px 40px rgba(0,0,0,0.12)",
        "card-hover":   "0 20px 60px rgba(0,0,0,0.2)",
      },
      animation: {
        "float":        "float 6s ease-in-out infinite",
        "pulse-slow":   "pulse 4s ease-in-out infinite",
        "spin-slow":    "spin 20s linear infinite",
        "shimmer":      "shimmer 2s linear infinite",
        "slide-up":     "slideUp 0.6s ease-out forwards",
        "fade-in":      "fadeIn 0.8s ease-out forwards",
        "lantern-sway": "lanternSway 3s ease-in-out infinite",
      },
      keyframes: {
        float:        { "0%,100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-20px)" } },
        shimmer:      { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        slideUp:      { "0%": { opacity: "0", transform: "translateY(30px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        fadeIn:       { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        lanternSway:  { "0%,100%": { transform: "rotate(-5deg)" }, "50%": { transform: "rotate(5deg)" } },
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },
    },
  },
  plugins: [],
};

export default config;
