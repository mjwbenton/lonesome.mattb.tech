const detectFrontmatter = require("remark-frontmatter");
const extractFrontmatter = require("remark-extract-frontmatter");
const yaml = require("yaml").parse;
const mdxDataFetching = require("@mattb.tech/mdx-data-fetching");
const remarkFlickr = require("@mattb.tech/remark-flickr");
const mdxTailwindTypography = require("@mattb.tech/mdx-tailwind-typography");
const rehypePrism = require("@mapbox/rehype-prism");

const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [
      detectFrontmatter,
      [extractFrontmatter, { name: "frontmatter", yaml, throws: true }],
      [mdxDataFetching, { globalPropsProviders: ["navigation/navigationPropsProvider"] }],
      [remarkFlickr, { sizes: "100vw" }]
    ],
    rehypePlugins: [
      [mdxTailwindTypography, { additionalClasses: "mb-8" }],
      rehypePrism
    ]
  },
});
module.exports = withMDX({
  pageExtensions: ["tsx", "mdx"],
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
});
