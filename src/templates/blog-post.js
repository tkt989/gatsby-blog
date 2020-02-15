import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Article from "../components/article"
import styles from "./blog-post.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const siteDescription = data.site.siteMetadata.description
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle} description={siteDescription}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        date={post.frontmatter.date}
      />
      <Article
        post={post}
        location={location}
        excerpt={false}
        comment={true}
        share={true}></Article>

      <nav className={styles.nav}>
        {previous && (
          <Link to={previous.fields.slug} className={styles.prev}>
            <FontAwesomeIcon icon={["fas", "arrow-left"]}></FontAwesomeIcon>
            {previous.frontmatter.title}
          </Link>
        )}
        {next && (
          <Link to={next.fields.slug} className={styles.next}>
            {next.frontmatter.title}
            <FontAwesomeIcon icon={["fas", "arrow-right"]}></FontAwesomeIcon>
          </Link>
        )}
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "YYYY/MM/DD")
        description
      }
    }
  }
`
