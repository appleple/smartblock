import * as React from 'react'
import { setBlockType } from 'prosemirror-commands'
import uuid from 'uuid'
import BlockQuoteIcon from '../components/icons/Blockquote'
import { Extension, ExtensionSchema } from '../types'
import { blockActive } from '../utils'

export default class BlockQuote extends Extension {
  constructor(schema?: ExtensionSchema) {
    super();
    this.customSchema = schema;
  }
  get name() {
    return 'blockquote'
  }

  get group() {
    return 'block'
  }

  get showMenu() {
    return true
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
          getAttrs(dom) {
            return {
              id: dom.getAttribute('id') || uuid()
            }
          }
        }
      ],
      attrs: {
        align: { default: 'left' },
        id: { default: '' }
      },
      toDOM: node => {
        return [
          'blockquote',
          {
            id: node.attrs.id || uuid()
          },
          0
        ]
      }
    }
  }

  get icon() {
    return <BlockQuoteIcon style={{ width: '24px', height: '24px' }} />
  }

  active(state) {
    return blockActive(state.schema.nodes.blockquote)(state)
  }

  enable(state) {
    return setBlockType(state.schema.nodes.blockquote)(state)
  }

  onClick(state, dispatch) {
    setBlockType(state.schema.nodes.blockquote)(state, dispatch)
  }
}