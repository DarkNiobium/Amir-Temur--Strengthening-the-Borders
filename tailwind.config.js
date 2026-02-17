export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        samarkand: '#0F1A2E',
        midnight: '#070a16',
        royal: '#1a237e',
        bronze: '#CD7F32',
        gold: '#FFD700',
        parchment: '#F5E6D3',
      },
      fontFamily: {
        heading: ['Cinzel', 'serif'],
        serif: ['Playfair Display', 'serif'],
        body: ['Lato', 'sans-serif'],
      },
      backgroundImage: {
        'pattern-grid': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%23ffffff' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glow: '0 0 40px rgba(217, 182, 110, 0.2)',
      },
    },
  },
  plugins: [],
}
