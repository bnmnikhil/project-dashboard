/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Neutral dark scale (cool-tinted, low chroma).
        ink: {
          950: 'oklch(0.16 0.004 265)',
          900: 'oklch(0.17 0.004 265)',
          850: 'oklch(0.185 0.005 265)',
          800: 'oklch(0.2 0.005 265)',
          700: 'oklch(0.25 0.006 265)',
          600: 'oklch(0.32 0.006 265)',
          500: 'oklch(0.55 0.006 265)',
          400: 'oklch(0.62 0.006 265)',
          300: 'oklch(0.72 0.006 265)',
          100: 'oklch(0.95 0.003 265)',
        },
      },
      keyframes: {
        fadeup: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        fadeup: 'fadeup 0.4s ease both',
      },
    },
  },
  plugins: [],
};
