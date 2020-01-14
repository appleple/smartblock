import React from 'react';


export default () => {

  return (<>
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
    <section className="section github-section">
      <div className="inner is-small">
        <p>If you like our project, we glad to have star! :)</p>
        <a className="github-button" href="https://github.com/appleple/smartblock" data-icon="octicon-star" aria-label="Star appleple/smartblock on GitHub">Star</a>
      </div>
    </section>
  </>);
}