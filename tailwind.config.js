module.exports = {
  purge: ['./src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      'body': ["fira-sans", "Arial", "sans-serif"],
      'heading': ["fira-sans-2", "Arial", "sans-serif"]
    }
  },
  variants: {
    extend: {
      textColor: ['visited'],
    },
  },
  plugins: [],
}
