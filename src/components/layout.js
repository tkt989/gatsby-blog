import React from "react"
import { Link } from "gatsby"
import Header from "../components/header"
import Footer from "../components/footer"

const Layout = ({ location, title, description, children }) => {
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
      <main>{children}</main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  )
}

export default Layout
