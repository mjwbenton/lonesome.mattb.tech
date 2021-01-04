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
              sizes: "100vw",
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
