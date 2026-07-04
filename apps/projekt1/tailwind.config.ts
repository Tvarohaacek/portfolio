import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        md: "2rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        ink: {
          DEFAULT: "hsl(var(--ink))",
          deep: "hsl(var(--ink-deep))",
        },
        mist: "hsl(var(--mist))",
        line: "hsl(var(--line))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          dark: "hsl(var(--primary-dark))",
          soft: "hsl(var(--primary-soft))",
          foreground: "hsl(var(--primary-foreground))",
        },
        honey: {
          DEFAULT: "hsl(var(--honey))",
          soft: "hsl(var(--honey-soft))",
          foreground: "hsl(var(--honey-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--mist))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      fontFamily: {
        display: [
          '"Bricolage Grotesque Variable"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        sans: [
          '"Instrument Sans Variable"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      boxShadow: {
        soft: "0 6px 24px -10px hsl(225 64% 15% / 0.10)",
        lift: "0 18px 44px -16px hsl(225 64% 15% / 0.18)",
        cta: "0 10px 24px -10px hsl(229 74% 53% / 0.55)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(-4px)" },
          "50%": { transform: "translateY(6px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.25s ease-out",
        "accordion-up": "accordion-up 0.25s ease-out",
        float: "float 7s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
