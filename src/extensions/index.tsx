import Paragraph from './paragraph';

import Trash from './trash';
import MoveUp from './move-up';
import MoveDown from './move-down';

import DefaultKeys from './default-keys';
import DefaultPlugins from './default-plugins';
import { Extension } from '../types/';

export default [
  // blocks
  new Paragraph(),
  // new Heading2(),
  // new Heading3(),
  // new ListItem(),
  // new BulletList(),
  // new OrderedList(),
  // new Embed(),
  // new Code(),
  // new Table(),
  // new BlockQuote(),
  // marks
  // new Strong(),
  // new Emphasis(),
  // new Underline(),
  // new Strike(),
  // new Link(),
  // utility
  new MoveDown(),
  new MoveUp(),
  new Trash(),
  // default
  new DefaultKeys(),
  new DefaultPlugins({
    placeholder: 'Content here...'
  })
] as Extension[]
