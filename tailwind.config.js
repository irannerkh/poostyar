/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Vazirmatn', 'Tahoma', 'sans-serif'],
      },
      colors: {
        brand: {
          plum: '#6D1344',
          plumDark: '#4D0B2F',
          blush: '#F7DDE4',
          cream: '#FDF8F6',
          lilac: '#EAE2F8',
          gold: '#D4AF37',
          roseGold: '#E8B4B8',
        },
      },
      boxShadow: {
        glass: '0 12px 40px -10px rgba(109, 19, 68, 0.12)',
        soft: '0 8px 30px rgba(43, 18, 32, 0.06)',
      },
    },
  },
  plugins: [],
};
