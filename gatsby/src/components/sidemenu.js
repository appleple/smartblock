import React from 'react';
import { Link, withPrefix } from 'gatsby';

export default (props) => {

  return (<div className="sidebar hide-on-small">
    <div className="sidebar-inner">
      <div style={{ marginBottom: '2rem' }}>
        <div className="type-h3">
          <span>Getting Started</span>
        </div>
        <div className="tree">
          <ul>
            <li className={props.active.indexOf('get-started') !== -1 ? 'is-current' : ''}>
              <Link to="/get-started">Installation</Link>
            </li>
            <li className={props.active.indexOf('usage') !== -1 ? 'is-current' : ''}>
              <Link to="/usage">Usage</Link>
            </li>
          </ul>
        </div>

        <div className="type-h3">
          <span>API</span>
        </div>
        <div className="tree">
          <ul>
            <li className={props.active.indexOf('extensions') !== -1 ? 'is-current' : ''}>
              <Link to="/extensions">Extensions</Link>
            </li>
            <li className={props.active.indexOf('props') !== -1 ? 'is-current' : ''}>
              <Link to="/props">Props</Link>
            </li>
            <li className={props.active.indexOf('customize') !== -1 ? 'is-current' : ''}>
              <Link to="/customize">Customize</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>);
}