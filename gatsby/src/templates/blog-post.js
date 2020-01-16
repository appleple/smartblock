import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SideMenu from '../components/sidemenu'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle} post={true}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <main class="main docs">
          <SideMenu active={post.fields.slug} />
          <div class="content">
            <section class="section">
              <div class="inner is-small">
                <h2>{post.frontmatter.title}</h2>
                <section dangerouslySetInnerHTML={{ __html: post.html }} />
                {/* <nav>
                  <ul
                    style={{
                      display: `flex`,
                      flexWrap: `wrap`,
                      justifyContent: `space-between`,
                      listStyle: `none`,
                      padding: 0,
                    }}
                  >
                    <li>
                      {previous && (
                        <Link to={previous.fields.slug} rel="prev">
                          ← {previous.frontmatter.title}
                        </Link>
                      )}
                    </li>
                    <li>
                      {next && (
                        <Link to={next.fields.slug} rel="next">
                          {next.frontmatter.title} →
                        </Link>
                      )}
                    </li>
                  </ul>
                </nav> */}
              </div>
            </section>
          </div>
        </main>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
          site {
          siteMetadata {
          title
        }
        }
    markdownRemark(fields: {slug: {eq: $slug } }) {
          id
      excerpt(pruneLength: 160)
        html
      frontmatter {
          title
        date(formatString: "MMMM DD, YYYY")
        description
      }

      fields {
        slug
      }
      

    }
  }
`
