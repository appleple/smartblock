import * as React from 'react';
import { render } from 'react-dom';
import { SmartBlock, GlobalStyle, Image, Heading3 } from './src/';
import extensions from './src/extensions/';
import sample from './sample';


extensions.push(new Image({
}));

render(<>
  <GlobalStyle />
  <SmartBlock
    showTitle
    titlePlaceholder="ここにタイトルを入力"
    extensions={extensions}
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
