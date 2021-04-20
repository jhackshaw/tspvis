module.exports = {
  siteMetadata: {
    title: `Traveling Salesman Problem Solver`,
    description: ``,
    author: `@jhackshaw`
  },
  plugins: [
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-PS28HLQ",
        includeInDevelopment: false
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "content",
        path: `${__dirname}/src/content`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-prismjs`]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `tsp visualizer`,
        short_name: `tspvis`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `fullscreen`,
        icon: `src/images/favicon.png`
      }
    },
    `gatsby-plugin-offline`
  ]
};
