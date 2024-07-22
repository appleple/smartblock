import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Top from '../components/top';

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Top data={data}/>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { toppage: { eq: "true" } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`

export const Head = () => (
  <Seo
    title="SmartBlock - A Modern Block Based Wysiwyg Editor using React and ProseMirror"
    description="SmartBlock - A Modern Block Based Wysiwyg Editor using React and ProseMirror"
  />
)
