/* eslint react-refresh/only-export-components: 0 */

import { Plugin } from 'prosemirror-state'
import SmartBlock from './components/smartblock'
import Button from './components/button'
import EditMenu from './components/edit-menu'
import Editor from './components/editor'
import InlineMenu from './components/inline-menu'
import Menu from './components/menu'
import {
  getViewport,
  isInput,
  markActive,
  blockActive,
  canInsert,
  findNodePosition,
  getParentNodePosFromState,
  createTable,
  liftListItem,
  findSelectedNodeWithType
} from './utils'

// extensions
import Link from './extensions/link'
import Image from './extensions/image'
import BulletList from './extensions/bullet-list'
import CustomBlock from './extensions/custom-block'
import CustomMark from './extensions/custom-mark'
import Heading1 from './extensions/heading1'
import Heading2 from './extensions/heading2'
import Heading3 from './extensions/heading3'
import Heading4 from './extensions/heading4'
import Heading5 from './extensions/heading5'
import Heading6 from './extensions/heading6'
import ListItem from './extensions/list-item'
import Blockquote from './extensions/blockquote'
import Embed from './extensions/embed'
import Code from './extensions/code'
import MoveDown from './extensions/move-down'
import MoveUp from './extensions/move-up'
import OrderedList from './extensions/ordered-list'
import Paragraph from './extensions/paragraph'
import Strike from './extensions/strike'
import Strong from './extensions/strong'
import Table from './extensions/table'
import Trash from './extensions/trash'
import Emphasis from './extensions/emphasis'
import Underline from './extensions/underline'
import DefaultKeys from './extensions/default-keys'
import DefaultPlugins from './extensions/default-plugins'
import Extensions from './extensions'

// icons
import Heading1Icon from './components/icons/heading1'
import Heading2Icon from './components/icons/heading2'
import Heading3Icon from './components/icons/heading3'
import Heading4Icon from './components/icons/heading4'
import Heading5Icon from './components/icons/heading5'
import Heading6Icon from './components/icons/heading6'


export {
  /* components */
  SmartBlock,
  Button,
  EditMenu,
  Editor,
  InlineMenu,
  Menu,
  /*
    extensions
  */
  /* blocks */
  Extensions,
  Link,
  Image,
  BulletList,
  CustomBlock,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  ListItem,
  MoveDown,
  MoveUp,
  OrderedList,
  Paragraph,
  Blockquote,
  Table,
  Embed,
  Code,
  /* inline */
  Emphasis,
  Strike,
  Strong,
  Underline,
  CustomMark,
  Trash,
  /* utils */
  getViewport,
  isInput,
  markActive,
  blockActive,
  canInsert,
  findNodePosition,
  findSelectedNodeWithType,
  getParentNodePosFromState,
  createTable,
  liftListItem,

  /* defaults */
  DefaultKeys,
  DefaultPlugins,
  /* official */
  Plugin,
  /* icons */
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon
}

export * from './types'
