import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Modern Architectural Earth Material Palette
        earth: {
          50: "#faf8f5", // Limestone white
          100: "#f4f0e8", // Warm concrete
          200: "#e8dcc6", // Light travertine
          300: "#d4c4a0", // Sandstone
          400: "#b8a082", // Weathered stone
          500: "#9d7c5a", // Corten steel
          600: "#8b6914", // Oxidized bronze
          700: "#6b4e1a", // Dark timber
          800: "#4a3419", // Charred wood
          900: "#2d1f0f", // Basalt
          950: "#1a1209", // Deep earth
        },
        clay: {
          50: "#fdf6f3", // Light terracotta
          100: "#fae8e1", // Warm clay
          200: "#f4cfc4", // Adobe
          300: "#e9a894", // Fired clay
          400: "#dc7a5c", // Brick
          500: "#c85a3a", // Deep terracotta
          600: "#a8442a", // Burnt sienna
          700: "#8b3424", // Iron oxide
          800: "#6f2a1f", // Dark clay
          900: "#5a241d", // Burnt umber
          950: "#311018", // Deep earth
        },
        stone: {
          50: "#f8f7f4", // Marble white
          100: "#f0ede6", // Light granite
          200: "#e1dac8", // Limestone
          300: "#cfc4a7", // Sandstone
          400: "#b8a888", // Weathered stone
          500: "#9d8b6c", // Slate
          600: "#7d6b4f", // Dark stone
          700: "#665540", // Basalt
          800: "#544635", // Charcoal stone
          900: "#473c2e", // Deep slate
          950: "#2a2319", // Obsidian
        },
        moss: {
          50: "#f6f8f4", // Light sage
          100: "#e9f0e2", // Pale moss
          200: "#d4e1c5", // Soft green
          300: "#b5cc9f", // Sage
          400: "#94b176", // Moss green
          500: "#759654", // Forest moss
          600: "#5c7a40", // Deep moss
          700: "#486034", // Pine
          800: "#3c4f2c", // Dark forest
          900: "#334227", // Deep green
          950: "#1c2516", // Forest shadow
        },
      },
      fontFamily: {
        // Architectural Typography
        display: ["Inter", "system-ui", "sans-serif"], // Clean, modern
        heading: ["Inter", "system-ui", "sans-serif"], // Architectural precision
        body: ["Inter", "system-ui", "sans-serif"], // Readable, neutral
        mono: ["JetBrains Mono", "Consolas", "monospace"], // Technical specs
      },
      fontSize: {
        // Architectural scale - based on modular scale
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1.1" }],
        "6xl": ["3.75rem", { lineHeight: "1.1" }],
        "7xl": ["4.5rem", { lineHeight: "1.1" }],
        "8xl": ["6rem", { lineHeight: "1.1" }],
        "9xl": ["8rem", { lineHeight: "1.1" }],
      },
      spacing: {
        // Architectural grid system
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
