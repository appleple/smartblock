import SmartBlock from './src/adapter';
import extensions from './src/extensions/';
import Code from './src/extensions/code';
import Image from './src/extensions/image';
import markdown from './sample';
import * as showdown from 'showdown';
import './css/smartblock.css';

extensions.push(new Code());
extensions.push(new Image({
  imgClassName: 'small',
  withCaption: false,
  imgFullClassName: 'full',
}))

// import CustomBlock from './src/extensions/custom-block';
// import Heading3 from './src/extensions/heading3';
// custom block
// extensions.push(new CustomBlock({
//   tagName: 'h3',
//   className: 'foofoo',
//   icon: `
//     <svg height="24" width="24">
//       <circle cx="12" cy="12" r="12" fill="blue" />
//     </svg>`
// }))

// extensions.push(new CustomBlock({
//   tagName: 'p',
//   className: 'hogehoge',
//   icon: `
//     <svg height="24" width="24">
//       <circle cx="12" cy="12" r="12" fill="red" />
//     </svg>`
// }))


SmartBlock('#app', {
  showTitle: true,
  titlePlaceholder: 'ここにタイトルを入力',
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
