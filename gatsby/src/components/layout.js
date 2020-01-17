import React from "react"
import { Link } from "gatsby"

import Header from './header';
import Footer from './footer';

class Layout extends React.Component {
  render() {
    const { location, title, children, post } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    const className = post ? 'header is-sticky is-ghost is-colored' : ''

    return (
      <>
        <Header className={className} post={post} />
        {children}
        <Footer />
      </>
    )
  }
}

export default Layout
