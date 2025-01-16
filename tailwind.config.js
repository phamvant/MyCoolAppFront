/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--background-color))",
        border: "rgba(var(--border-color))",
        card: "rgba(var(--card-color))",
        primary: "rgba(var(--primary-color))",
        secondary: "rgba(var(--secondary-color))",
        cardForeground: "rgba(var(--card-foreground))",
        accent: "rgba(var(--accent-color))",
        success: "rgba(var(--success-color))",
        info: "rgba(var(--info-color))",
        warning: "rgba(var(--warning-color))",
        danger: "rgba(var(--danger-color))",
        text: "rgba(var(--text-color))",
        textSecondary: "rgba(var(--text-secondary-color))",
        textMuted: "rgba(var(--text-muted-color))",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
