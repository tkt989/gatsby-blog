import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Article from "../components/article"
import styles from "./blog-list.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

export default ({ data, location, pathContext }) => {
  const siteTitle = data.site.siteMetadata.title
  const siteDescription = data.site.siteMetadata.description
  const posts = data.allMarkdownRemark.edges
  const { numPages, currentPage } = pathContext
  return (
    <Layout location={location} title={siteTitle} description={siteDescription}>
      <SEO title="All posts" />
      {posts.map(({ node }) => {
        return (
          <Article post={node} location={location} excerpt={true} share={false}></Article>
        )
      })}
      <nav className={styles.nav}>
        {currentPage != 1 &&
          <Link className={styles.left} to={currentPage == 2 ? `/` : `/page/${currentPage - 1}`}>
            <FontAwesomeIcon icon="arrow-left"></FontAwesomeIcon>
            Prev Page
          </Link>
        }
        {currentPage != numPages &&
          <Link className={styles.right} to={`/page/${currentPage + 1}`}>
            Next Page
            <FontAwesomeIcon icon="arrow-right"></FontAwesomeIcon>
          </Link>
        }
      </nav>
    </Layout>
  )
}

export const blogListQuery = graphql`
  query MyQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          html
          excerpt(truncate: true)
          frontmatter {
            title
            date(formatString: "YYYY/MM/DD")
            description
          }
        }
      }
    }
  }
`