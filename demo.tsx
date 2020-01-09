import SmartBlock from './src/adapter';
import markdown from './sample';
import * as showdown from 'showdown';

SmartBlock('#app', {
  showTitle: true,
  titlePlaceholder: 'ここにタイトルを入力',
  markdown,
  showdown,
  outputMarkdown: true,
  onChange: ({ markdown }) => {
    console.log(markdown)
  }
});