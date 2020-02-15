import React from "react"
import Bio from "./bio"
import styles from "./footer.module.scss"
import { Link } from "gatsby"

export default ({ recents }) => {
  console.log(recents)
  return (
    <section className={styles.container}>
      <div className={styles.infoContainer}>
        <Bio></Bio>

        <div className={styles.recents}>
          <h3>Recent Posts</h3>

          {recents.map(edge => {
            return (
              <Link to={edge.node.fields.slug} className={styles.recentsPost}>
                {edge.node.frontmatter.title}
              </Link>
            )
          })}
        </div>
      </div>
      <div className={styles.footer}>
        © {new Date().getFullYear()},Built with
        {` `}
        <a className={styles.gatsby} href="https://www.gatsbyjs.org">
          Gatsby
        </a>
      </div>
    </section>
  )
}