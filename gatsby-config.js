module.exports = {
  siteMetadata: {
    navigationGroups: ["Photos", "Keyboards", "Playlists", "Other"]
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
    `@mattb/gatsby-transform-flickr-set`,
    `@mattb/gatsby-transform-spotify-playlist`
  ]
};
