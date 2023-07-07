import * as React from 'react';
import { wrapInList, sinkListItem } from 'prosemirror-schema-list';
import * as uuid from 'uuid/v4'
import Undent from '../components/icons/undent';
import Indent from '../components/icons/indent';
import List from '../components/icons/list';
import { liftListItem, blockActive, getParentNodeFromState } from '../utils';
import { Extension, ExtensionProps } from '../types';
import Button from '../components/button';

export default class BulletList extends Extension {
  constructor(props?: ExtensionProps) {
    super(props);
  }

  get name() {
    return 'bullet_list';
  }

  get group() {
    return 'block';
  }

  get showMenu() {
    return true;
  }

  get schema() {
    if (this.customSchema) {
      return
    }
    return {
      content: 'list_item+',
      group: 'block',
      attrs: {
        id: { default: '' }
      },
      parseDOM: [
        {
          tag: 'ul',
          getAttrs(dom) {
            return {
              id: dom.getAttribute('id')
            }
          }
        }
      ],
      toDOM(node) {
        return [
          'ul',
          {
            class: this.className
          },
          0
        ]
      }
    }
  }

  get icon() {
    return <List style={{ width: '24px', height: '24px' }} />
  }

  get hideBlockMenuOnFocus() {
    return true;
  }

  active(state) {
    return blockActive(state.schema.nodes.bullet_list)(state);
  }

  enable(state) {
    const node = getParentNodeFromState(state)
    if (node.type.name !== 'paragraph') {
      return false;
    }
    return wrapInList(state.schema.nodes.bullet_list)(state);
  }

  onClick(state, dispatch) {
    const node = getParentNodeFromState(state);
    if (node.type.name !== 'paragraph') {
      return false;
    }
    wrapInList(state.schema.nodes.bullet_list)(state, dispatch);
  }

  customMenu({ state, dispatch }) {
    return (
      <>
        <Button
          type="button"
          disabled={!liftListItem(state.schema.nodes.list_item)(state)}
          onClick={() => {
            liftListItem(state.schema.nodes.list_item)(state, dispatch);
          }}
        >
          <Undent style={{ width: '24px', height: '24px' }} />
        </Button>
        <Button
          type="button"
          disabled={!sinkListItem(state.schema.nodes.list_item)(state)}
          onClick={() => {
            sinkListItem(state.schema.nodes.list_item)(state, dispatch)
          }}
        >
          <Indent style={{ width: '24px', height: '24px' }} />
        </Button>
      </>
    )
  }
}
