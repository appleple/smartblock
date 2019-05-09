import * as React from 'react';
import { render } from 'react-dom';
import App from './app';


render(<App html={`
<p>Hello World</p>
<h1>Test</h1>
<ul>
  <li>リスト1</li>
  <li>リスト2</li>
</ul>
`} 

onChange={({json, html}) => {
  console.log(json, html);
}}/>, document.querySelector('#app'));
