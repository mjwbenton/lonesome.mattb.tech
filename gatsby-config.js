module.exports = {
  siteMetadata: {
    navigationGroups: ["Photos", "Keyboards", "Playlists"]
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: { path: `${__dirname}/content`, name: "markdown-pages" }
    },
    `@mattb.tech/gatsby-transform-flickr-set`,
    `@mattb.tech/gatsby-transform-spotify-playlist`,
    `gatsby-plugin-catch-links`
  ]
};
