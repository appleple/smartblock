import Paragraph from './paragraph';
import Heading2 from './heading2';
import Heading3 from './heading3';
import ListItem from './list-item';
import BulletList from './bullet-list';
import OrderedList from './ordered-list';
import Table from './table';

import Underline from './underline';
import Strike from './strike';
import Strong from './strong';
import Link from './link';

import Lift from './lift';

export default [
  //blocks
  new Paragraph(),
  new Heading2(),
  new Heading3(),
  new ListItem(),
  new BulletList(),
  new OrderedList(),
  new Table(),
  //marks
  new Underline(),
  new Strike(),
  new Strong(),
  new Link(),
  //utility
  new Lift(),

];