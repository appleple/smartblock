import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"
import Header from './header';
import Footer from './footer';

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`

    return (
      <>
        <Header />
        {children}
        <Footer />
      </>
    )
  }
}

export default Layout
