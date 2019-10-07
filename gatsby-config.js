module.exports = {
  siteMetadata: {
    title: `Traveling Salesman Problem Solver`,
    description: ``,
    author: `@jhackshaw`,
  },
  plugins: [
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        // icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-PS28HLQ",
  
        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,

      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'categories',
        path: `${__dirname}/src/content`
      }
    },

    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-prismjs`,
          { 
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 690
            }
          }
        ]
      }
    },
  ],
  
}
