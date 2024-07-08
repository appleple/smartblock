import React from 'react';
import { Link } from 'gatsby';

import Logo from './logo.svg';
import Offcanvas from './offcanvas';

export default (props) => {


  const [className, setClassName] = React.useState(props.className ? props.className : 'header is-sticky is-ghost');
  const [isOpen, setIsOpen] = React.useState(false);

  if (!props.className) {
    React.useEffect(() => {
      window.addEventListener('scroll', function () {
        if (window.pageYOffset > 50) {
          setClassName('header is-sticky is-ghost active');
        } else {
          setClassName('header is-sticky is-ghost');
        }
      });
    }, []);
  }

  return (<>
    <Offcanvas 
      post={props.post}
      isOpen={isOpen} 
      onClose={() => {
        setIsOpen(false);
      }}
    />
    <header className={className}>
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