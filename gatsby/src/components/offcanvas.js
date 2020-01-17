import React from 'react';
import { Link } from 'gatsby';

export default (props) => {

  return (<div className={props.isOpen ? 'offcanvas is-active' : 'offcanvas'}>
    <div className="offcanvas-overlay offcanvas-close"></div>
    <div className="offcanvas-content">
      <button className="button is-close offcanvas-close" onClick={() => {
        props.onClose();
      }}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className="inner">
        <div class="offcanvas-menu">
          <Link to="/">Home</Link>
          <Link to="/get-started">Document</Link>
        </div>
        <hr />
        <div className="offcanvas-menu">
          <a href="https://github.com/appleple/smartblock" className="button is-white is-small"><i className="fa fa-github"></i> GitHub</a>
          <a href="https://github.com/appleple/smartblock/archive/master.zip" className="button is-small"><i className="fa fa-download"></i> Download</a>
          <hr />
          <p>version 1.2.2</p>
        </div>
      </div>
    </div>
  </div>)
}