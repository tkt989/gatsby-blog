import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import styles from "./bio.module.scss"

library.add(fab)

export default () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `)

  return (
    <div className={styles.container}>
      <img className={styles.icon} src="https://github.com/tkt989.png" />
      <div className={styles.socials}>
        <a className={styles.social} href="https://github.com/tkt989">
          <FontAwesomeIcon icon={["fab", "github"]}></FontAwesomeIcon>
        </a>
        <a className={styles.social} href="https://twitter.com/tkt989_dev">
          <FontAwesomeIcon icon={["fab", "twitter"]}></FontAwesomeIcon>
        </a>
      </div>
    </div>
  )
}
