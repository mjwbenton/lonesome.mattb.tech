const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.tsx', './pages/**/*.{tsx,mdx}'],
    options: {
      keyframes: true
    }
  },
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
      'mono': ["Consolas", "Monaco", "Andale Mono", "Ubuntu Mono", "monospace"]
    },
    colors: {
      transparent: 'transparent',
      current: "currentColor",
      gray: {
        DEFAULT: colors.coolGray[100],
        dark: colors.coolGray[300]
      },
      accent: {
        DEFAULT: colors.emerald[500],
        dark: colors.emerald[700]
      },
      accent2: {
        DEFAULT: colors.violet[500],
        dark: colors.violet[700]
      },
      white: colors.white
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
