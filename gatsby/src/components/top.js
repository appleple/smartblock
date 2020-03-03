import React from 'react';
import 'smartblock/css/smartblock.css';
import Extensions from 'smartblock/lib/extensions';
import Code from 'smartblock/lib/extensions/code';
import Image from 'smartblock/lib/extensions/image';
import { Link, withPrefix } from 'gatsby';
import latestVersion from 'latest-version';
const SmartBlock = typeof window === "undefined" ? <div/> : React.lazy(() => import('smartblock/lib/components/smartblock'));
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
  const [outputJSON, setOutputJSON] = React.useState('');
  const [tab, setTab] = React.useState('html');
  const [version, setVersion] = React.useState('');

  React.useEffect(() => {
    (async () => {
      const version = await latestVersion('smartblock');
      setVersion(version);
    })();
  }, []);
  
  return (<>
    <section className="hero is-center firstview">
      <div className="inner is-small">
        <div className="box" style={{ textAlign: 'center' }}>
          <p className="margin-top-medium lead">Modern block styled editor <br />powered with React and ProseMirror<br /> Easier to edit on touchscreen.</p>
        </div>
      </div>
      <div className="inner hero-inner" style={{ textAlign: 'center'}}>
        <Link to="/get-started" className="button">Get Started</Link>
        <p className="small">Current Version : Ver.{version}</p>
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
                    setOutputJSON(json);
                  }}
                />
              </React.Suspense>
            )}
            </div>
            </div>
            <h2 style={{ marginTop: '-50px' }}>Output Result</h2>
            <div className="tab" style={{marginBottom: '50px'}}>
              <div className="tab-list">
                <a 
                  className={tab === 'html' ? 'is-current' : ''} 
                  onClick={() => {
                    setTab('html');
                  }}>HTML</a>
                <a 
                  className={tab === 'json' ? 'is-current' : ''}
                  onClick={() => {
                    setTab('json');
                  }}
                >JSON</a>
              </div>
              <div className="tab-content">
                <div className="is-active">
                  {tab === 'html' && <pre className="language-html"><code>{outputHTML}</code></pre>}
                  {tab === 'json' && <pre className="language-html"><code>{JSON.stringify(outputJSON)}</code></pre>}
                </div>
              </div>
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

