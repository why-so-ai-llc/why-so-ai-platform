import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: 'var(--color-bg)',
          surface: 'var(--color-surface)',
          text: 'var(--color-text)',
          muted: 'var(--color-muted)',
          primary: 'var(--color-primary)',
          glow: 'var(--color-glow)',
        },
        // Remap Tailwind's lime scale so existing utilities follow the brand palette.
        lime: {
          300: '#C4FF5E',
          400: '#A3FF12',
          500: '#39FF14',
        },
      },
      fontFamily: {
        tech: ['var(--font-orbitron)', 'var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 0 1px rgba(163,255,18,0.35), 0 0 24px -6px rgba(57,255,20,0.45)',
      },
    },
  },
  plugins: [],
};

export default config;
