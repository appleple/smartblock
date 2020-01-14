import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"
import Header from './header';

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`

    return (
      <>
        <Header />
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </>
    )
  }
}

export default Layout
