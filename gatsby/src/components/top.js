import React from 'react';
import Extensions from 'smartblock/lib/extensions';
const SmartBlock = React.lazy(() => import('smartblock/lib/components/smartblock'));
const GlobalStyle = React.lazy(() => import('smartblock/lib/utils/style'));


const html = `<p>SmartBlock is a block styled editor created by JavaScript. Which gives you nice experience of editing contents at touchscreen. On this page you can see it in action. Try to edit this text ! :)</p>
<h2>Features</h2>
<ul>
  <li>Easy to use with touchscreen device (e.g. smartphone, tablet)</li>  
  <li>Fully customizable</li>
  <li>Block styled editor</li>
  <li>Keep clean HTML and wipe out unnecessary tags</li>
  <li>Get the result as HTML or JSON</li>
  <li>Keep style when copy and paste contents</li>
</ul>
<p style="text-align:center;">SmartBlock is provided with MIT license. <br/>Made by : @appleple ♥ OSS</p>`;


export default (props) => {

  const isSSR = typeof window === "undefined"
  const { data } = props;
  const { markdownRemark } = data;
  
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
            <div dangerouslySetInnerHTML={{
                __html: markdownRemark.html
              }} />
          </div>
        </section>
        </div>
      </main>
  </>);
}

