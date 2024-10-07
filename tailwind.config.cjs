module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { 
        fableblack: '#1c1c1c',
        fableblue: '#504EE9',
        fablegrey: '#999999',
        fablelightgrey: '#E8E8E8',
        fablepurple: '#834ADA'
      },
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        lg: '1.25rem',
      },
      boxShadow: {
        md: '0px 1px 2px rgba(0, 0, 0, 0.05);'
      }
    },
  },
  plugins: [],
};