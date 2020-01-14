import React from 'react';


export default () => {
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
              <div id="app"></div>
            </div>
            <h2 style={{ marginTop: '0'}}>Installation</h2>
            <h3>npm package</h3>
            <p>Install the package via npm</p>
            <pre><code>$ npm install smartblock --save</code></pre>
            <h3>Load script from CDN</h3>
            <p>Download smartblock.js file to your project and load it.</p>
            <pre><code className="html">&lt;script src="https://unpkg.com/smartblock@1.2.1/dist/smartblock.js"&gt;&lt;/script&gt;</code></pre>
            <h2>Usage</h2>
            <h3>As an React</h3>
            {/* <pre><code className="jsx">import * as React from 'react';
import {render} from 'react-dom';
import {SmartBlock, GlobalStyle} from 'smartblock';
              
              render(&lt;&gt;
                &lt;GlobalStyle /&gt;
                &lt;SmartBlock
                  html="&lt;h2&gt;Hello World&lt;/h2&gt;&lt;p&gt;Hello&lt;/p&gt;"
    onChange={(json, html) =& gt; console.log(html)}
            /&gt;
&lt;/&gt;, documeng.getElementById('#app'));</code></pre>
            <h3>As an native JavaScript</h3>
            <pre><code className="js">import SmartBlock from 'smartblock/lib/adapter';
  import Extensions from 'smartblock/lib/extensions';
  
SmartBlock('#editor', {
                extensions: Extensions,
  onChange: ({html}) => console.log(html)
});</code></pre> */}
            <h2>Compatibility</h2>
            <p>IE11, and Edge, iOS Safari, Firefox, Chrome, Safari</p>
          </div>
        </section>

        <div className="section-devider">
          <section className="section">
            <div className="inner is-small">
              <h2><i className="fa fa-book"></i> Document</h2>
              <p>Usage, introduction of other functions, component introduction etc. <br />are described in detail in the document. </p>
              <p><a href="#" className="button is-ghost-disabled"><i className="fa fa-book"></i> Coming soon ;)</a></p>
            </div>
          </section>

          <section className="section">
            <div className="inner is-small">
              <h2><i className="fa fa-github"></i> View on GitHub</h2>
              <p>SmartBlock was developed by <a href="https://twitter.com/appleplecom">@appleplecom</a> and is open source (MIT license) on GitHub.<br />Please send us feedback, requests, bug reports and pull requests!</p>
              <p>If you like it, please press Star ;)</p>
              <p style={{ marginTop: '10px' }}><a href="https://github.com/appleple/SmartBlock" className="button is-white"><i className="fa fa-github"></i> GitHub page</a></p>
            </div>
          </section>
        </div>
      </div>
    </main>

    <section className="section github-section">
      <div className="inner is-small">
        <p>If you like our project, we glad to have star! :)</p>
<a className="github-button" href="https://github.com/appleple/smartblock" data-icon="octicon-star" aria-label="Star appleple/smartblock on GitHub">Star</a>
      </div>
    </section>
  </>);
}

