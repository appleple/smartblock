import React from 'react';
import Extensions from 'smartblock/lib/extensions';
const SmartBlock = React.lazy(() => import('smartblock/lib/components/smartblock'));
const GlobalStyle = React.lazy(() => import('smartblock/lib/utils/style'));


export default (props) => {

  const isSSR = typeof window === "undefined"
  const { data } = props;
  const posts = data.allMarkdownRemark.edges
  
  return (<>
    <section className="hero is-center firstview">
      <div className="inner is-small">
        <div className="box" style={{ textAlign: 'center' }}>
          <p className="margin-top-medium lead">Modern block styled editor <br />powered with React<br /> Easier to edit on touchscreen.</p>
        </div>
      </div>
      <div className="inner hero-inner" style={{ textAlign: 'center'}}>
        <a href="#" className="button">Get Started</a>
        <p className="small">Current Version : Ver.1.2.2</p>
      </div>
    </section>

    <main className="main">
      <div className="content">

        <section className="section" style={{paddingTop: '0'}}>
          <div className="inner is-small">
            <div className="app-frame">
            {!isSSR && (
              <React.Suspense fallback={<div />}>
                <SmartBlock 
                  showTitle
                  titleText="What is SmartBlock?"
                  extensions={Extensions} 
                  html={html}
                />
                <GlobalStyle />
              </React.Suspense>
            )}
            </div>
            {posts.map(({ node }) => {
              return(<div dangerouslySetInnerHTML={{
                __html: node.frontmatter.description || node.excerpt,
              }}>{node.html}</div>);
            })}
          </div>
        </section>
        </div>
      </main>
  </>);
}

