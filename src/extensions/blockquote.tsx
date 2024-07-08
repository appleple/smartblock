import * as React from 'react';
import { setBlockType } from 'prosemirror-commands';
import * as uuid from 'uuid/v4';
import BlockQuoteIcon from '../components/icons/blockquote';
import { Extension, ExtensionProps } from '../types';
import { blockActive } from '../utils';
import { BASE_PRIORITY } from '../constants';

export default class BlockQuote extends Extension {
  constructor(props?: ExtensionProps) {
    super(props);
  }

  get name() {
    return 'blockquote';
  }

  get group() {
    return 'block';
  }

  get showMenu() {
    return true;
  }

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
          getAttrs(dom) {
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
      toDOM: (node) => {
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

  get icon() {
    return <BlockQuoteIcon style={{ width: '24px', height: '24px' }} />;
  }

  active(state) {
    return blockActive(state.schema.nodes.blockquote)(state);
  }

  enable(state) {
    return setBlockType(state.schema.nodes.blockquote)(state);
  }

  onClick(state, dispatch) {
    setBlockType(state.schema.nodes.blockquote)(state, dispatch);
  }
}
