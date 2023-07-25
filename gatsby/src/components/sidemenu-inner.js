import React from 'react';
import { Link } from 'gatsby';

export default (props) => {

  return (
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
        <span>Extensions</span>
      </div>
      <div className="tree">
        <ul>
          <li className={props.active.indexOf('blocks') !== -1 ? 'is-current' : ''}>
            <Link to="/blocks">Blocks</Link>
          </li>
          <li className={props.active.indexOf('marks') !== -1 ? 'is-current' : ''}>
            <Link to="/marks">Marks</Link>
          </li>
          <li className={props.active.indexOf('utils') !== -1 ? 'is-current' : ''}>
            <Link to="/utils">Utils</Link>
          </li>
        </ul>
      </div>
      <div className="type-h3">
        <span>API</span>
      </div>
      <div className="tree">
        <ul>
          <li className={props.active.indexOf('props') !== -1 ? 'is-current' : ''}>
            <Link to="/props">Props</Link>
          </li>
          <li className={props.active.indexOf('customize') !== -1 ? 'is-current' : ''}>
            <Link to="/customize">Customize</Link>
          </li>
        </ul>
      </div>
      <div className="type-h3">
        <span>Community</span>
      </div>
      <div className="tree">
        <ul>
          <li className={props.active.indexOf('qa') !== -1 ? 'is-current' : ''}>
            <Link to="/qa">Q&A</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}