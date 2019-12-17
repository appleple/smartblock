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
    <li>Get the result as <strong>HTML</strong> or <strong>JSON</strong></li>
  </ul>
  <h2>Install</h2>
  <code class="shell">
  $ npm install smartblock --save
  </code>
  <h2>Usage</h2>
  <code class="js">
  import * as React from 'react';<br/>
  import { render } from 'react-dom';<br/>
  import { SmartBlock, GlobalStyle } from 'smartblock';<br/>
  <br/>
  render(&lt;&gt;<br/>
    &lt;GlobalStyle /&gt;<br/>
    &lt;SmartBlock <br/>
      html={'&lt;h2&gt;Hello World&lt;/h2&gt;&lt;p&gt;hello&lt;/p&gt;'}<br/>
      onChange={({ json, html }) =&gt; { console.log(json, html);}}  <br/>
    /><br/>
  &lt;/&gt;, document.getElementById("app"));<br/>
  </code>
  <h2>Extensions</h2>
  <h2>Customize</h2>
  <p>You can add custom block like this</p>
  <code lang="js">
  import { Extensions, CustomBlock, CustomMark } from 'smartblock';<br/>
  Extensions.push(new CustomBlock({ <br/>
    tagName: 'div',  <br/>
    className: '.alert',  <br/>
    icon: &lt;SomeIconComponent /&gt;<br/>
  });<br/>
  <br/>
  render(&lt;&gt;<br/>
    &lt;GlobalStyle /&gt;<br/>
    &lt;SmartBlock <br/>
      extensions={Extensions}<br/>
      html={'&lt;h2&gt;Hello World&lt;/h2&gt;&lt;p&gt;hello&lt;/p&gt;'}<br/>
      onChange={({ json, html }) =&gt; { console.log(json, html);}}  <br/>
    /&gt;<br/>
  &lt;/&gt;, document.getElementById("app"));<br/>
  </code>
  <p>You can also add custom inline element like this</p>
  
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
