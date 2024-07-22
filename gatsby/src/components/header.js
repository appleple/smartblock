import React from 'react';
import { Link } from 'gatsby';

import Logo from './logo.svg';
import Offcanvas from './offcanvas';

export default function Header (props) {

  const [isOpen, setIsOpen] = React.useState(false);

  return (<>
    <Offcanvas
      post={props.post}
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
    />
    <header className={props.className}>
      <h1 className="logo is-small"><Link to="/"><img src={Logo} alt="SmartBlock" /></Link></h1>
      <nav className="header-menu">
        <div className="pulldown">
          <Link to="/get-started">Document</Link>
        </div>
        <a href="https://github.com/appleple/smartblock/" className="button is-white is-small"><i className="fa fa-github"></i>GitHub</a>
      </nav>
      <button
        className="button is-burger hide-on-medium hide-on-large offcanvas-open"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  </>);
}
