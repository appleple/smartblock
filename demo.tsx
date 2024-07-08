import SmartBlock from './src/adapter';
import extensions from './src/extensions/';
import Code from './src/extensions/code';
import Image from './src/extensions/image';
import CustomBlock from './src/extensions/custom-block';
import markdown from './sample';
import * as showdown from 'showdown';
import './css/smartblock.css';

extensions.push(new Code());
extensions.push(new Image({
  imgClassName: 'small',
  withCaption: false,
  imgFullClassName: 'full',
}))

// @ts-ignore
extensions.push(new CustomBlock({
  tagName: 'p',
  customName: 's-paragraph',
  className: 's-paragraph',
  icon: `
    <svg height="24" width="24">
      <circle cx="12" cy="12" r="12" fill="red" />
    </svg>`
}))

// @ts-ignore
extensions.push(new CustomBlock({
  tagName: 'h2',
  customName: 's-heading2',
  className: 's-heading2'
}))

SmartBlock('#app', {
  showTitle: true,
  markdown,
  showdown,
  outputMarkdown: true,
  extensions,
  onChange: ({ markdown }) => {
  }
});

// JSX version
// import * as React from 'react';
// import { render } from 'react-dom';
// import SmartBlock from './src/components/smartblock';

// render(<>
//   <SmartBlock
// 	extensions={extensions}
// 	html='
//     <h3 class="foofoo">Hello, World!</h3>
//     <p class="hogehoge">hoge</p>
//     <p>html</p>'
// 	showTitle={true}
// 	onChange={({html}) => console.log(html)}
//   />
// </>,
// document.getElementById('app')
// );
