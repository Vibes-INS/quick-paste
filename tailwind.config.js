module.exports = {
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx,css}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      textColor: ['active'],
      borderColor: ['hover']
    }
  },
  plugins: []
}
