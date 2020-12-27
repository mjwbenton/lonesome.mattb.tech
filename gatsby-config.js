require("ts-node/register");
require("dotenv").config();

module.exports = {
  flags: { PRESERVE_WEBPACK_CACHE: true },
  siteMetadata: {
    navigationOrder: ["Photos", "Keyboards", "Playlists", "Reading", "Code"],
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `@mattb.tech/gatsby-remark-flickr`,
            options: {
              /*
               * See Photo.tsx for full explanation. We use tailwind breakpoints, but with an additional 2rem of padding. However, we have a max-width of 48rem (see styles.css), which kicks in at the 1024px breakpoint.
               */
              sizes:
                "(min-width: 1024px) 45rem, (min-width: 768px) 728px (min-width: 640px) 600px, 100vw",
            },
          },
          `gatsby-remark-prismjs`,
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: { path: `${__dirname}/content`, name: "markdown-pages" },
    },
    `@mattb.tech/gatsby-transform-flickr-set`,
    `@mattb.tech/gatsby-transform-spotify-playlist`,
    `gatsby-plugin-catch-links`,
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "Api",
        fieldName: "api",
        url: "https://api.mattb.tech",
      },
    },
  ],
};
