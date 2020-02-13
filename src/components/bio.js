/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

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

  const { author, social } = data.site.siteMetadata
  return (
    <div className={`${styles.container} columns is-vcentered`}>
      <figure className="image is-96x96">
        <img className="is-rounded" src="https://github.com/tkt989.png" />
      </figure>
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
