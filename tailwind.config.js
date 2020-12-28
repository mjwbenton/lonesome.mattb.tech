module.exports = {
  purge: ['./src/**/*.tsx'],
  darkMode: false,
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            pre: false,
            code: false
          }
        }
      },
    },
    fontFamily: {
      'heading': ["fira-sans-2", "Arial", "sans-serif"],
      'mono': ["Consolas", "Monaco", "Andale Mono", "Ubuntu Mono", "monospace"]
    }
  },
  variants: {
    extend: {
      backgroundColor: ['odd'],
      textColor: ['visited', 'odd'],
      borderWidth: ['last'],
      margin: ['first', 'last']
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
