import React from "react"
import Bio from "./bio"
import styles from "./footer.module.scss"

export default () => {
  return (
    <section className="footer">
      <div className="columns is-centered">
        <Bio></Bio>
      </div>
      <div className={`${styles.footer} columns is-centered`}>
        © {new Date().getFullYear()},Built with
        <a href="https://www.gatsbyjs.org">Gatsby</a>
        </div>
    </section>
  )
}