module.exports = {
  siteMetadata: {
    title: `tkt989 🍵  ブログ`,
    author: `tkt989`,
    description: `日々のメモ`,
    siteUrl: `https://blog.tkt989.info/`,
    social: {
      twitter: `tkt989_dev`,
    },
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-twitter`,
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `tkt989sdiary`
      }
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: `UA-110212902-1`,
        head: true,
      }
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `M PLUS Rounded 1c:400,700`
        ],
        display: 'swap'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `tkt989 ブログ`,
        short_name: `tkt989 ブログ`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
  ],
}
