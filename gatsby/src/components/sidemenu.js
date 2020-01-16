import React from 'react';
import { Link, withPrefix } from 'gatsby';

export default (props) => {

  
  return (<div className="sidebar hide-on-small">
  <div className="sidebar-inner">
    <div style={{ marginBottom: '2rem'}}>
      <div className="type-h3">
        <span>Getting Started</span>
      </div>
      <div className="tree">
        <ul>
          <li className={props.active.indexOf('get-started') !== -1 ? 'is-current' : '' }>
            <Link to={withPrefix("/get-started")}>Installation</Link>
          </li>
          <li className={props.active.indexOf('usage') !== -1 ? 'is-current' : '' }>
            <Link to={withPrefix("/usage")}>Usage</Link>  
          </li>
        </ul>
      </div>

      <div className="type-h3">
        <span>API</span>
      </div>
      <div className="tree">
        <ul>
          <li className={props.active.indexOf('options') !== -1 ? 'is-current' : '' }>
            <a href="#">Options</a>
          </li>
          <li className={props.active.indexOf('custom' ) !== -1 ? 'is-current' : '' }>
            <a href="#">Custom Buttons</a>
          </li>
          <li className={props.active.indexOf('events' ) !== -1 ? 'is-current' : '' }>
            <a href="#">Events</a>
          </li>
          <li className={props.active.indexOf('methods') !== -1 ? 'is-current' : '' }>
            <a href="#">Methods</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>);
}