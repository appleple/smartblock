import React from 'react';

export default () => {
  return (<div className="sidebar hide-on-small">
  <div className="sidebar-inner">
    <div style={{ marginBottom: '2rem'}}>
      <div className="type-h3">
        <span>Getting Started</span>
      </div>
      <div className="tree">
        <ul>
          <li className="is-current">
            <a href="#">Installation</a>
          </li>
          <li>
            <a href="./usage.html">Usage</a>  
          </li>
        </ul>
      </div>

      <div className="type-h3">
        <span>API</span>
      </div>
      <div className="tree">
        <ul>
          <li>
            <a href="options.html">Options</a>
          </li>
          <li>
            <a href="custom-buttons.html">Custom Buttons</a>
          </li>
          <li>
            <a href="events.html">Events</a>
          </li>
          <li>
            <a href="methods.html">Methods</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>);
}