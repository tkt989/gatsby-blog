import React from "react"
import { Link } from "gatsby"

export default ({ title, description }) => {
  return (
    <section className="hero">
      <div className="hero-body">
        <h1
          className="title has-text-centered"
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
        <h2 className="has-text-centered">
          {description}
        </h2>
      </div>
    </section>
  )
}