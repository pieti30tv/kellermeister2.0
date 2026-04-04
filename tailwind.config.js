/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  safelist: [
    'bg-[#8B4513]',
    'text-[#8B4513]',
    'border-[#8B4513]',
    'border-[#2d5a27]',
    'bg-[#2d5a27]',
    'text-[#2d5a27]',
    'border-l-[#8B4513]',
    'border-l-[#2d5a27]',
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        wine: {
          bg: '#f0ebe0',
          card: '#faf7f2',
          cardHover: '#f5f0e6',
          heading: '#1a2e1a',
          secondary: '#5c6b5c',
          accent: '#2d5a27',
          accentHover: '#234820',
          border: '#ddd5c4',
          muted: '#8a9a8a',
        },
      },
      borderRadius: {
        wine: '14px',
        'wine-sm': '8px',
        'wine-pill': '980px',
      },
      boxShadow: {
        wine: '0 2px 16px rgba(45,90,39,0.08)',
      },
    },
  },
  plugins: [],
}
