import React from "react"
import { Link } from "gatsby"
import styles from "./header.module.scss"

export default ({ title, description }) => {
  return (
    <section className={styles.container}>
        <h1
          className={styles.title}
          style={{
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
        <h2 className={styles.description}>
          {description}
        </h2>
    </section>
  )
}