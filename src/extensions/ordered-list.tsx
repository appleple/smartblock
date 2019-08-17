import * as React from 'react'
import { wrapInList, sinkListItem } from 'prosemirror-schema-list'
import uuid from 'uuid'
import OrderedListIcon from '../components/icons/OrderedList'
import IndentIcon from '../components/icons/Indent'
import UndentIcon from '../components/icons/Undent'
import { liftListItem, blockActive, getParentNodeFromState } from '../utils'
import { Extension, ExtensionProps } from '../types'

import Button from '../components/button'

export default class OrderedList extends Extension {
  constructor(props?: ExtensionProps) {
    super(props);
  }

  get name() {
    return 'ordered_list'
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
      content: 'list_item+',
      group: 'block',
      parseDOM: [
        {
          tag: 'ol',
          getAttrs(dom) {
            return {
              id: dom.getAttribute('id')
            }
          }
        }
      ],
      attrs: {
        id: { default: '' }
      },
      toDOM(node) {
        return [
          'ol',
          {
            id: node.attrs.id || uuid(),
            class: this.className
          },
          0
        ]
      }
    }
  }

  get icon() {
    return <OrderedListIcon style={{ width: '24px', height: '24px' }} />
  }

  active(state) {
    return blockActive(state.schema.nodes.ordered_list)(state)
  }

  enable(state) {
    const node = getParentNodeFromState(state);
    if (node.type.name !== 'paragraph') {
      return false;
    }
    return wrapInList(state.schema.nodes.ordered_list)(state)
  }

  onClick(state, dispatch) {
    const node = getParentNodeFromState(state);
    if (node.type.name !== 'paragraph') {
      return false;
    }
    wrapInList(state.schema.nodes.ordered_list)(state, dispatch)
  }

  customMenu({ state, dispatch }) {
    return (
      <>
        <Button
          type="button"
          onClick={() => {
            liftListItem(state.schema.nodes.list_item)(state, dispatch)
          }}
        >
          <UndentIcon style={{ width: '24px', height: '24px' }} />
        </Button>
        <Button
          type="button"
          onClick={() => {
            sinkListItem(state.schema.nodes.list_item)(state, dispatch)
          }}
        >
          <IndentIcon style={{ width: '24px', height: '24px' }} />
        </Button>
      </>
    )
  }
}
