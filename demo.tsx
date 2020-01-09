import SmartBlock from './src/adapter';
import sample from './sample';

SmartBlock('#app', {
  showTitle: true,
  titlePlaceholder: 'ここにタイトルを入力',
  markdown: sample,
  onChange: ({ html }) => {
    console.log(html)
  }
});