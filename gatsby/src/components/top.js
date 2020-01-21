import React from 'react';
import Extensions from 'smartblock/lib/extensions';
import Code from 'smartblock/lib/extensions/code';
import Image from 'smartblock/lib/extensions/image';
import { Link, withPrefix } from 'gatsby';
const SmartBlock = typeof window === "undefined" ? <div/> : React.lazy(() => import('smartblock/lib/components/smartblock'));
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
<p style="text-align:center;">SmartBlock is provided with MIT license. <br/>Made by : @appleple ♥ OSS</p>
<img src="${withPrefix('/footer.svg')}" />
`;


export default (props) => {

  const isSSR = typeof window === "undefined"
  const { data } = props;
  const { markdownRemark } = data;
  const [outputHTML, setOutputHTML] = React.useState('');
  
  return (<>
    <section className="hero is-center firstview">
      <div className="inner is-small">
        <div className="box" style={{ textAlign: 'center' }}>
          <p className="margin-top-medium lead">Modern block styled editor <br />powered with React<br /> Easier to edit on touchscreen.</p>
        </div>
      </div>
      <div className="inner hero-inner" style={{ textAlign: 'center'}}>
        <Link to="/get-started" className="button">Get Started</Link>
        <p className="small">Current Version : Ver.1.2.5</p>
      </div>
    </section>

    <main className="main">
      <div className="content">

        <section className="section" style={{paddingTop: '0'}}>
          <div className="inner is-small">
            <div className="app-frame">
              <div className="app-frame-inner">
            {!isSSR && (
              <React.Suspense fallback={<div />}>
                <SmartBlock 
                  showTitle
                  titleText="What is SmartBlock?"
                  extensions={[
                    ...Extensions, 
                    new Code(), 
                    new Image({
                      withCaption: false,
                      imgFullClassName: 'full',
                      imgClassName: 'small'
                    })
                  ]} 
                  html={html}
                  onChange={({html, json}) => {
                    setOutputHTML(html);
                  }}
                />
                <GlobalStyle />
              </React.Suspense>
            )}
            </div>
            </div>
            <pre className="language-html"><code>{outputHTML}</code></pre>
            <div dangerouslySetInnerHTML={{
                __html: markdownRemark.html
              }} />
          </div>
        </section>
        </div>
      </main>
  </>);
}

