/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: "#fff8f0",
          100: "#ffecd1",
          200: "#ffd49e",
          300: "#ffb561",
          400: "#ff8c1a",
          500: "#f07000",
          600: "#d45a00",
          700: "#b04500",
          800: "#8c3600",
          900: "#6b2a00",
        },
        ink: {
          50: "#f0f4ff",
          100: "#dce6ff",
          200: "#b3c8ff",
          300: "#80a3ff",
          400: "#4d7aff",
          500: "#1a52ff",
          600: "#0033cc",
          700: "#002299",
          800: "#001166",
          900: "#000d4d",
        },
        jade: {
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
        },
        slate: {
          850: "#0f172a",
          900: "#0a0f1e",
          950: "#060b17",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "typing": "typing 1.4s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        typing: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.3 },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "noise": "url('/noise.svg')",
      },
    },
  },
  plugins: [],
};
