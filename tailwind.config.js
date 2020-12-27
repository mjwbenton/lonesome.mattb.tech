module.exports = {
  purge: ['./src/**/*.tsx'],
  darkMode: false,
  theme: {
    extend: {},
    fontFamily: {
      'heading': ["fira-sans-2", "Arial", "sans-serif"],
      'mono': ["Consolas", "Monaco", "Andale Mono", "Ubuntu Mono", "monospace"]
    }
  },
  variants: {
    extend: {
      backgroundColor: ['odd'],
      textColor: ['visited', 'odd'],
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
