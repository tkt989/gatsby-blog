import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Header from "../components/header"
import Footer from "../components/footer"
import styles from "./layout.module.scss"

const Layout = ({ location, title, description, children }) => {
  const data = useStaticQuery(query)
  const recents = data.recents

  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
      }}
    >
      <header>
        <Header title={title} description={description}></Header>
      </header>
      <main className={styles.main}>{children}</main>
      <footer>
        <Footer recents={recents.edges}></Footer>
      </footer>
    </div>
  )
}

const query = graphql`
         query LayoutQuery {
           categoris: allMarkdownRemark {
             group(field: frontmatter___categories) {
              category: fieldValue
              totalCount
            }
           }
           recents: allMarkdownRemark(
             sort: { fields: [frontmatter___date], order: DESC }
             limit: 5
           ) {
             edges {
               node {
                 fields {
                   slug
                 }
                 frontmatter {
                   title
                   date
                 }
               }
             }
           }
         }
       `

export default Layout
