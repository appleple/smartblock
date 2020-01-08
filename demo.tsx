import * as React from 'react';
import { render } from 'react-dom';
import SmartBlock from './lib/components/smart-block';
import sample from './sample';


// extensions.push(new Image({
// }));

render(<>
  <GlobalStyle />
  <SmartBlock
    showTitle
    titlePlaceholder="ここにタイトルを入力"
    titleText="SmartBlock.js"
    markdown={sample}
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
