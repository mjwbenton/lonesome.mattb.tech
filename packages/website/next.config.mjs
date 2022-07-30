import detectFrontmatter from "remark-frontmatter";
import extractFrontmatter from "remark-extract-frontmatter";
import yaml from "yaml";
import { plugin as mdxDataFetching } from "@mattb.tech/data-fetching";
import { plugin as remarkFlickr } from "@mattb.tech/remark-flickr";
import rehypePrism from "@mapbox/rehype-prism";
import nextPluginPreval from "next-plugin-preval/config.js";
import bundleAnalyzer from "@next/bundle-analyzer";
import mdx from "@next/mdx";

const withMDX = mdx({
  options: {
    remarkPlugins: [
      detectFrontmatter,
      [
        extractFrontmatter,
        { name: "pageMeta", yaml: yaml.parse, throws: true },
      ],
      mdxDataFetching,
      [remarkFlickr, { sizes: "100vw" }],
    ],
    rehypePlugins: [rehypePrism],
  },
});

export default nextPluginPreval()(
  bundleAnalyzer({ enabled: process.env.ANALYZE === "true" })(
    withMDX({
      pageExtensions: ["tsx", "mdx"],
      reactStrictMode: true,
      eslint: {
        dirs: ["pages", "src"],
      },
    })
  )
);
