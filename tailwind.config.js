/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          black: '#050608',
          void: '#07090E',
          slate: '#0B0D13',
          card: '#111622',
          border: 'rgba(255, 255, 255, 0.08)',
          hover: 'rgba(255, 255, 255, 0.12)',
        },
        stellar: {
          gold: '#E89A3C',
          amber: '#F59E0B',
          cyan: '#38BDF8',
          blue: '#0284C7',
          white: '#F9FAFB',
          gray: '#9CA3AF',
          muted: '#6B7280',
        },
        status: {
          passive: '#10B981',
          stable: '#0284C7',
          concluded: '#F59E0B',
          lost: '#EF4444',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
