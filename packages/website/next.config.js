const detectFrontmatter = require("remark-frontmatter");
const extractFrontmatter = require("remark-extract-frontmatter");
const yaml = require("yaml").parse;
const mdxDataFetching = require("@mattb.tech/mdx-data-fetching");
const remarkFlickr = require("@mattb.tech/remark-flickr");

const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [
      detectFrontmatter,
      [extractFrontmatter, { name: "frontmatter", yaml, throws: true }],
      [mdxDataFetching, { basePath: "src/", globalPropsProviders: ["navigation/navigationPropsProvider"] }],
      [remarkFlickr, { sizes: "100vw" }]
    ],
  },
});
module.exports = withMDX({
  pageExtensions: ["tsx", "mdx"],
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
});
