import React from 'react';

export default () => {
  return (<header className="header is-sticky is-ghost">
  <h1 className="logo is-small"><a href="./"><img src="./logo.svg" /></a></h1>
  <nav className="header-menu">
    <div className="pulldown">
      <a href="./get-started.html">Document</a>
    </div>
    <a href="https://github.com/appleple/SmartBlock" className="button is-white is-small"><i className="fa fa-github"></i> GitHub</a>
  </nav>
  <button className="button is-burger hide-on-medium hide-on-large offcanvas-open">
    <span></span>
    <span></span>
    <span></span>
  </button>
</header>);
}