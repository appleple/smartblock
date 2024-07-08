import Paragraph from './paragraph';

import Trash from './trash';
import MoveUp from './move-up';
import MoveDown from './move-down';
import Heading2 from './heading2';
import Heading3 from './heading3';
import ListItem from './list-item';
import BulletList from './bullet-list';
import OrderedList from './ordered-list';
import Embed from './embed';
import Table from './table';
import Blockquote from './blockquote';
import Strong from './strong';
import Emphasis from './emphasis';
import Underline from './underline';
import Strike from './strike';
import Link from './link';

import DefaultKeys from './default-keys';
import DefaultPlugins from './default-plugins';
import { Extension } from '../types/';

export default [
  // blocks
  new Paragraph(),
  new Heading2(),
  new Heading3(),
  new ListItem(),
  new BulletList(),
  new OrderedList(),
  new Embed(),
  // new Code(),
  new Table(),
  new Blockquote(),
  // marks
  new Strong(),
  new Emphasis(),
  new Underline(),
  new Strike(),
  new Link(),
  // utility
  new MoveDown(),
  new MoveUp(),
  new Trash(),
  // default
  new DefaultKeys(),
  new DefaultPlugins()
] as Extension[]
