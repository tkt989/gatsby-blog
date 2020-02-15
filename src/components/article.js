import React from "react"
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon,
  PocketShareButton,
  PocketIcon,
} from "react-share"
import styles from "./article.module.scss"
import { Link } from "gatsby";

export default ({ post, location, share }) => {
  const iconSize = 48;

  return (
    <div className="container">
      <article className="content">
        <header className={styles.header}>
          <Link className={styles.title} to={post.fields.slug}>
            <h1>{post.frontmatter.title}</h1>
          </Link>

          <p>
            {post.frontmatter.date}
            <time dateTime={post.frontmatter.date}></time>
          </p>
        </header>
        <section className={styles.content} dangerouslySetInnerHTML={{ __html: post.html }} />

        <footer className={styles.footer}>
          {share ? (
            <div className={styles.socials}>
              <FacebookShareButton
                url={location.href}
                className={styles.social}
              >
                <FacebookIcon size={iconSize} round={true}></FacebookIcon>
              </FacebookShareButton>
              <TwitterShareButton url={location.href} className={styles.social}>
                <TwitterIcon size={iconSize} round={true}></TwitterIcon>
              </TwitterShareButton>
              <LineShareButton url={location.href} className={styles.social}>
                <LineIcon size={iconSize} round={true}></LineIcon>
              </LineShareButton>
              <PocketShareButton url={location.href} className={styles.social}>
                <PocketIcon size={iconSize} round={true}></PocketIcon>
              </PocketShareButton>
            </div>
          ) : null}
        </footer>

        <hr className={styles.hr}/>
      </article>
    </div>
  )
}