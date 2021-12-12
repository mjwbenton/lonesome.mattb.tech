const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.tsx", "./pages/**/*.{tsx,mdx}"],
  safelist: ["prose", "dark:prose-dark"],
  darkMode: "class",
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            // Let prismjs handle code styling
            pre: false,
            code: false,
            // Not using the lead feature
            '[class~="lead"]': false,
            // Colors override
            color: theme("colors.dark.2"),
            a: {
              color: theme("colors.dark.DEFAULT"),
            },
            strong: {
              color: theme("colors.dark.DEFAULT"),
            },
            "ol > li::before": {
              color: theme("colors.dark.3"),
            },
            "ul > li::before": {
              backgroundColor: theme("colors.dark.3"),
            },
            hr: {
              borderColor: theme("colors.dark.2"),
            },
            blockquote: {
              color: theme("colors.dark.3"),
              borderLeftColor: theme("colors.dark.3"),
            },
            h1: {
              color: theme("colors.dark.DEFAULT"),
            },
            h2: {
              color: theme("colors.dark.DEFAULT"),
            },
            h3: {
              color: theme("colors.dark.DEFAULT"),
            },
            h4: {
              color: theme("colors.dark.DEFAULT"),
            },
            "figure figcaption": {
              color: theme("colors.dark.3"),
            },
            thead: {
              color: theme("colors.dark.DEFAULT"),
              borderBottomColor: theme("colors.dark.3"),
            },
            "tbody tr": {
              borderBottomColor: theme("colors.dark.3"),
            },
          },
        },
        dark: {
          css: [
            {
              color: theme("colors.light.2"),
              a: {
                color: theme("colors.light.DEFAULT"),
              },
              strong: {
                color: theme("colors.light.DEFAULT"),
              },
              "ol > li::before": {
                color: theme("colors.light.3"),
              },
              "ul > li::before": {
                backgroundColor: theme("colors.light.3"),
              },
              hr: {
                borderColor: theme("colors.light.2"),
              },
              blockquote: {
                color: theme("colors.light.3"),
                borderLeftColor: theme("colors.light.3"),
              },
              h1: {
                color: theme("colors.light.DEFAULT"),
              },
              h2: {
                color: theme("colors.light.DEFAULT"),
              },
              h3: {
                color: theme("colors.light.DEFAULT"),
              },
              h4: {
                color: theme("colors.light.DEFAULT"),
              },
              "figure figcaption": {
                color: theme("colors.light.3"),
              },
              thead: {
                color: theme("colors.light.DEFAULT"),
                borderBottomColor: theme("colors.light.3"),
              },
              "tbody tr": {
                borderBottomColor: theme("colors.light.3"),
              },
            },
          ],
        },
      }),
    },
    colors: {
      white: colors.white,
      dark: {
        DEFAULT: colors.neutral[900],
        1: colors.neutral[800],
        2: colors.neutral[600],
        3: colors.neutral[500],
      },
      light: {
        DEFAULT: colors.white,
        1: colors.neutral[100],
        2: colors.neutral[300],
        3: colors.neutral[400],
      },
      "accent-light": {
        DEFAULT: colors.emerald[500],
        1: colors.emerald[600],
      },
      "accent-dark": {
        DEFAULT: colors.violet[600],
        1: colors.violet[400],
      },
    },
    fontFamily: {
      mono: [
        "JetBrains Mono",
        "ui-monospace",
        "Menlo",
        "Monaco",
        "Consolas",
        "monospace",
      ],
    },
    fontWeight: {
      thin: 100,
      normal: 300,
      bold: 500,
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
