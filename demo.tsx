import * as React from 'react';
import { render } from 'react-dom';
import { PaperEditor } from './src/';
import './src/styles/base.css';

render(<PaperEditor html={`
<p>Hello World</p>
<h2>Test</h2>
<ul>
  <li>リスト1</li>
  <li>リスト2</li>
</ul>
<table>
  <tr>
    <th>aaa</th>
    <td>ee</td>
  </tr>
</table>
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
onChange={({json, html}) => {
}}/>, 
document.querySelector('#app'));
