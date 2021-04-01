const detectFrontmatter = require("remark-frontmatter");
const extractFrontmatter = require("remark-extract-frontmatter");
const yaml = require("yaml").parse;
const mdxDataFetching = require("@mattb.tech/mdx-data-fetching");
const remarkFlickr = require("@mattb.tech/remark-flickr");
const mdxTailwindTypography = require("@mattb.tech/mdx-tailwind-typography");
const rehypePrism = require("@mapbox/rehype-prism");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [
      detectFrontmatter,
      [extractFrontmatter, { name: "pageMeta", yaml, throws: true }],
      [
        mdxDataFetching,
        {
          globalDataProviders: [
            "navigation/navigationPropsProvider",
            "global/pageMetaDataProvider",
          ],
          contextBuilder: "global/contextBuilder",
          afterRun: "global/afterRun",
        },
      ],
      [remarkFlickr, { sizes: "100vw" }],
    ],
    rehypePlugins: [
      [mdxTailwindTypography, { additionalClasses: "dark:prose-dark mb-8" }],
      rehypePrism,
    ],
  },
});
module.exports = withBundleAnalyzer(
  withMDX({
    pageExtensions: ["tsx", "mdx"],
    reactStrictMode: true,
  })
);
