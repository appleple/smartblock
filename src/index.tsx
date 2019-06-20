import PaperEditor from './components/paper-editor'
import Button from './components/button'
import EditMenu from './components/edit-menu'
import Editor from './components/editor'
import InlineMenu from './components/inline-menu'
import Menu from './components/menu'
import { Plugin } from 'prosemirror-state';
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
import GlobalStyle from './utils/style'
import { Dispatch, Extension } from './types'

// extensions
import Link from './extensions/link'
import BulletList from './extensions/bullet-list'
import Heading2 from './extensions/heading2'
import Heading3 from './extensions/heading3'
import ListItem from './extensions/list-item'
import Blockquote from './extensions/blockquote';
import MoveDown from './extensions/move-down'
import MoveUp from './extensions/move-up'
import OrderedList from './extensions/ordered-list'
import Paragraph from './extensions/paragraph'
import Strike from './extensions/strike'
import Strong from './extensions/strong'
import Table from './extensions/table'
import Trash from './extensions/trash'
import Underline from './extensions/underline'
import DefaultKeys from './extensions/default-keys';
import DefaultPlugins from './extensions/default-plugins';
import Extensions from './extensions'

export {
  /* components */
  PaperEditor,
  Button,
  EditMenu,
  Editor,
  InlineMenu,
  Menu,
  GlobalStyle,
  /* 
    extensions 
  */
  /* blocks */
  Extensions,
  Link,
  BulletList,
  Heading2,
  Heading3,
  ListItem,
  MoveDown,
  MoveUp,
  OrderedList,
  Paragraph,
  Blockquote,
  /* inline */
  Strike,
  Strong,
  Table,
  Trash,
  Underline,
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
  /* types */
  Dispatch,
  Extension,
  /* defaults */
  DefaultKeys,
  DefaultPlugins,
  /* official */
  Plugin
}
