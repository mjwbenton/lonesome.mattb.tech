require("ts-node/register");
require("dotenv").config();
const { paragraphInline } = require("./css/sizes");

module.exports = {
  siteMetadata: {
    navigationGroups: ["Photos", "Keyboards", "Playlists"]
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `@mattb.tech/gatsby-remark-flickr`,
            options: {
              sizes: paragraphInline
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: { path: `${__dirname}/content`, name: "markdown-pages" }
    },
    `@mattb.tech/gatsby-transform-flickr-set`,
    `@mattb.tech/gatsby-transform-spotify-playlist`,
    `gatsby-plugin-catch-links`
  ]
};
