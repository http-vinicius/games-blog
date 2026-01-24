import type { Config } from "tailwindcss"

export default {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ===== Base (shadcn-like) =====
        // OBS: seu light está como --backdround (typo). Estou mapeando background pra ele.
        // O ideal é você renomear no CSS para --background.
        background: "var(--backdround)",
        foreground: "var(--foreground)",

        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },

        // ===== Seus tokens principais =====
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          hover: "var(--primary-hover)",
        },

        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },

        // ===== Tokens utilitários (custom) =====
        info: {
          DEFAULT: "var(--info)",
          foreground: "var(--info-foreground)",
        },

        success: {
          DEFAULT: "var(--success)",
          foreground: "var(--success-foreground)",
        },

        warning: {
          DEFAULT: "var(--warning)",
          foreground: "var(--warning-foreground)",
        },

        error: {
          DEFAULT: "var(--error)",
          foreground: "var(--error-foreground)",
        },

        text: {
          DEFAULT: "var(--text)",
          foreground: "var(--text-foreground)",
        },

        title: {
          DEFAULT: "var(--title)",
          foreground: "var(--title-foreground)",
        },
      },

      borderRadius: {
        lg: "0.75rem",
        md: "0.625rem",
        sm: "0.5rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config