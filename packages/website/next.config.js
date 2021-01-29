const detectFrontmatter = require("remark-frontmatter");
const extractFrontmatter = require("remark-extract-frontmatter");
const yaml = require("yaml").parse;
const mdxPagePlugin = require("@mattb.tech/mdx-data-fetching");

const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [
      detectFrontmatter,
      [extractFrontmatter, { name: "frontmatter", yaml, throws: true }],
      mdxPagePlugin,
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
