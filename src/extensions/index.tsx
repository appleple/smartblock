import Paragraph from './paragraph';
import Heading from './heading';
import ListItem from './list-item';
import BulletList from './bullet-list';
import OrderedList from './ordered-list';

import Underline from './underline';

export default [
  //blocks
  new Paragraph(),
  new Heading(),
  new ListItem(),
  new BulletList(),
  new OrderedList(),
  //marks
  new Underline()
];