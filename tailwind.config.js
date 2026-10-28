/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#09090b",
          900: "#0e0e11",
          850: "#121216",
          800: "#17171c",
          700: "#222228",
          600: "#2e2e36",
          500: "#3f3f48",
        },
        fg: {
          DEFAULT: "#ededef",
          muted: "#a1a1aa",
          dim: "#71717a",
          faint: "#52525b",
        },
        accent: {
          DEFAULT: "#34d399",
          hover: "#6ee7b7",
          muted: "#059669",
        },
        surface: {
          DEFAULT: "#0e0e11",
          50: "#121216",
          100: "#17171c",
          200: "#222228",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
        display: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        body: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        blink: { "0%, 49%": { opacity: "1" }, "50%, 100%": { opacity: "0" } },
        pulseRing: {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        "pulse-ring": "pulseRing 1.8s cubic-bezier(0.2, 0.6, 0.3, 1) infinite",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};
