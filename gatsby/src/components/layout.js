import React from "react"

import Header from './header';
import Footer from './footer';

class Layout extends React.Component {
  render() {
    const { children, post } = this.props

    return (
      <>
        <Header className={`header is-sticky ${post && 'is-colored'}`} post={post} />
        {children}
        <Footer />
      </>
    )
  }
}

export default Layout
