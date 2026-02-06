/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#06050e',
          raised: '#0c0b16',
          overlay: '#12111d',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.06)',
          hover: 'rgba(255, 255, 255, 0.10)',
          active: 'rgba(255, 255, 255, 0.14)',
        },
        accent: {
          DEFAULT: '#8b5cf6',
          muted: 'rgba(139, 92, 246, 0.12)',
        },
      },
    },
  },
  plugins: [],
}
