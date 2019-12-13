import * as React from 'react';
import { render } from 'react-dom';
import { SmartBlock, GlobalStyle } from './src/';
import Block from './src/extensions/custom-block';
import Mark from './src/extensions/custom-mark';
import extensions from './src/extensions/';

// extensions.push(new Block({
//   tagName: 'div',
//   className: 'acms-admin-alert',
//   icon: '<span class="fa fa-envelope-open"></span>',
// }));

render(<>
  <GlobalStyle />
  <SmartBlock
    showBackBtn
    showTitle
    autoSave
    titlePlaceholder="ここにタイトルを入力"
    extensions={extensions}
    titleText="SmartBlock.js"
    html={`
  <p>SmartBlock.js is a JavaScript which enables you to write contents easily on websites even with SmartPhone.</p>
  <h2>Features</h2>
  <ul>
    <li>Easy to use with SmartPhone</li>
    <li>Fully customizable</li>
    <li>Block based</li>
    <li>Keep clean HTML and wipe out unnecessary tags</li>
    <li>Get the result as HTML or JSON</li>
  </ul>
`}
    // json={{
    //   type: 'doc',
    //   content: [
    //   {
    //     type: 'paragraph',
    //     content: [{
    //       type: 'text',
    //       text: 'Example Paragraph'
    //     }]
    //   }
    // ]}}
    onChange={({ json, html }) => {
    }} /></>,
  document.querySelector('#app'));
