const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.tsx", "./pages/**/*.{tsx,mdx}"],
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
            // Override colours
            "--tw-prose-body": theme("colours.dark.2"),
            "--tw-prose-heading": theme("colors.dark.DEFAULT"),
            "--tw-prose-links": theme("colors.dark.DEFAULT"),
            "--tw-prose-bold": theme("colors.dark.DEFAULT"),
            "--tw-prose-counters": theme("colors.dark.3"),
            "--tw-prose-bullets": theme("colors.dark.3"),
            "--tw-prose-hr": theme("colors.dark.2"),
            "--tw-prose-quotes": theme("colors.dark.3"),
            "--tw-prose-quote-borders": theme("colors.dark.3"),
            "--tw-prose-captions": theme("colors.dark.3"),
            "--tw-prose-th-borders": theme("colors.dark.3"),
            "--tw-prose-td-borders": theme("colors.dark.3"),
            "--tw-prose-invert-body": theme("colours.light.2"),
            "--tw-prose-invert-heading": theme("colors.light.DEFAULT"),
            "--tw-prose-invert-links": theme("colors.light.DEFAULT"),
            "--tw-prose-invert-bold": theme("colors.light.DEFAULT"),
            "--tw-prose-invert-counters": theme("colors.light.3"),
            "--tw-prose-invert-bullets": theme("colors.light.3"),
            "--tw-prose-invert-hr": theme("colors.light.2"),
            "--tw-prose-invert-quotes": theme("colors.light.3"),
            "--tw-prose-invert-quote-borders": theme("colors.light.3"),
            "--tw-prose-invert-captions": theme("colors.light.3"),
            "--tw-prose-invert-th-borders": theme("colors.light.3"),
            "--tw-prose-invert-td-borders": theme("colors.light.3"),
          },
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
    animation: {
      "spin-slow": "spin 3s linear infinite",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
