import React from "react"

import Header from './header';
import Footer from './footer';

class Layout extends React.Component {
  render() {
    const { children, post } = this.props
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
