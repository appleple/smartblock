import Paragraph from './paragraph'
import Heading2 from './heading2'
import Heading3 from './heading3'
import ListItem from './list-item'
import BulletList from './bullet-list'
import OrderedList from './ordered-list'
import Table from './table' //WIP
import BlockQuote from './blockquote'

import Underline from './underline'
import Strike from './strike'
import Strong from './strong'
import Link from './link'
import Em from './em'

import Trash from './trash'
import MoveUp from './move-up'
import MoveDown from './move-down'

import DefaultKeys from './default-keys'
import DefaultPlugins from './default-plugins'

export default [
  // blocks
  new Paragraph(),
  new Heading2(),
  new Heading3(),
  new ListItem(),
  new BulletList(),
  new OrderedList(),
  // new Table(),
  new BlockQuote(),
  // marks
  new Strong(),
  new Em(),
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
]
