module.exports = {
  purge: ['./src/**/*.tsx'],
  darkMode: false,
  theme: {
    extend: {},
    fontFamily: {
      'body': ["fira-sans", "Arial", "sans-serif"],
      'heading': ["fira-sans-2", "Arial", "sans-serif"],
      'mono': ["Consolas", "Monaco", "Andale Mono", "Ubuntu Mono", "monospace"]
    }
  },
  variants: {
    extend: {
      backgroundColor: ['odd'],
      textColor: ['visited'],
    },
  },
  plugins: [],
}
