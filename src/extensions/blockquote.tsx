import * as React from 'react';
import { setBlockType } from 'prosemirror-commands';
import { v4 as uuid } from 'uuid';
import BlockQuoteIcon from '../components/icons/blockquote';
import { Dispatch, Extension, ExtensionProps } from '../types';
import { blockActive } from '../utils';
import { BASE_PRIORITY } from '../constants';
import { Node } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';

export default class BlockQuote extends Extension {
  constructor(props?: ExtensionProps) {
    super(props);
  }

  // @ts-ignore
  get name() {
    return 'blockquote';
  }

  // @ts-ignore
  get group() {
    return 'block';
  }

  // @ts-ignore
  get showMenu() {
    return true;
  }

  // @ts-ignore
  get schema() {
    if (this.customSchema) {
      return this.customSchema;
    }
    return {
      content: 'inline*',
      group: 'block',
      parseDOM: [
        {
          tag: 'blockquote',
          priority: BASE_PRIORITY,
          getAttrs(dom: HTMLElement) {
            return {
              id: dom.getAttribute('id') || uuid(),
            };
          },
        },
      ],
      attrs: {
        align: { default: 'left' },
        id: { default: '' },
      },
      toDOM: (node: Node) => {
        return [
          'blockquote',
          {
            class: this.className,
          },
          0,
        ];
      },
    };
  }

  // @ts-ignore
  get icon() {
    return <BlockQuoteIcon style={{ width: '24px', height: '24px' }} />;
  }

  active(state: EditorState) {
    return blockActive(state.schema.nodes.blockquote)(state);
  }

  enable(state: EditorState) {
    return setBlockType(state.schema.nodes.blockquote)(state);
  }

  onClick(state: EditorState, dispatch: Dispatch) {
    setBlockType(state.schema.nodes.blockquote)(state, dispatch);
  }
}
