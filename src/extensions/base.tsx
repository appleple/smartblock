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
  new MoveDown(),
  new MoveUp(),
  new Trash(),
  new DefaultKeys(),
  new DefaultPlugins({
    placeholder: 'Content here...'
  })
] as Extension[]
