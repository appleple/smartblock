import React from 'react';

import Logo from './logo.svg';

export default (props) => {

  
  const [className, setClassName] = React.useState(props.className ? props.className : 'header is-sticky is-ghost');
  
  if (!props.className) {
    React.useEffect(() => {
      window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
          setClassName('header is-sticky is-ghost active');
        } else {
          setClassName('header is-sticky is-ghost');
        }
      });
    }, []);
  }

  return (<header className={className}>
  <h1 className="logo is-small"><a href="./"><img src={Logo} /></a></h1>
  <nav className="header-menu">
    <div className="pulldown">
      <a href="./get-started">Document</a>
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