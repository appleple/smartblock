import SmartBlock from './src/adapter';
import extensions from './src/extensions/';
import Code from './src/extensions/code';
import Image from './src/extensions/image';
import markdown from './sample';
import * as showdown from 'showdown';

extensions.push(new Code());
extensions.push(new Image({
  imgClassName: 'small',
  withCaption: false,
  imgFullClassName: 'full',
}))

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
// import GlobalStyle from './src/utils/style';
// import extensions from './src/extensions';
// ​
// render(<>
//   <GlobalStyle />
//   <SmartBlock 
// 	extensions={extensions} 
// 	html="html" 
// 	showTitle={true} 
// 	onChange={({html}) => console.log(html)}
//   />
// </>,
// document.getElementById('app')
// );