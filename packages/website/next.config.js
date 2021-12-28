const detectFrontmatter = require("remark-frontmatter");
const extractFrontmatter = require("remark-extract-frontmatter");
const yaml = require("yaml").parse;
const { plugin: mdxDataFetching } = require("@mattb.tech/data-fetching");
const remarkFlickr = require("@mattb.tech/remark-flickr");
const rehypePrism = require("@mapbox/rehype-prism");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [
      detectFrontmatter,
      [extractFrontmatter, { name: "pageMeta", yaml, throws: true }],
      mdxDataFetching,
      [remarkFlickr, { sizes: "100vw" }],
    ],
    rehypePlugins: [rehypePrism],
  },
});
module.exports = withBundleAnalyzer(
  withMDX({
    pageExtensions: ["tsx", "mdx"],
    reactStrictMode: true,
  })
);
