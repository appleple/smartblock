import * as React from 'react';
import { render } from 'react-dom';

import {
  /* components */
  SmartBlock,
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
  /* types */
  Dispatch,
  Extension,
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
} from '../';


export default (item: string | HTMLElement, option) => {
  const dom = typeof item === 'string' ? document.querySelector(item) : item;
  render(<SmartBlock 
    {...option}
  />, dom);
}
