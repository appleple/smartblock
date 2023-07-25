import React from 'react';
import SideMenuInner from './sidemenu-inner';

export default (props) => {

  return (<div className="sidebar hide-on-small">
    <div className="sidebar-inner">
      <SideMenuInner active={props.active} />
    </div>
  </div>);
}