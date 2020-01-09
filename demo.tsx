import SmartBlock from './src/adapter';
import extensions from './src/extensions/';
import Code from './src/extensions/code';
import markdown from './sample';
import * as showdown from 'showdown';

extensions.push(new Code());

SmartBlock('#app', {
  showTitle: true,
  titlePlaceholder: 'ここにタイトルを入力',
  markdown,
  showdown,
  outputMarkdown: true,
  extensions,
  onChange: ({ markdown }) => {
    console.log(markdown)
  }
});