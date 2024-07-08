import * as React from 'react';
import { wrapInList, sinkListItem } from 'prosemirror-schema-list';
import * as uuid from 'uuid/v4';
import OrderedListIcon from '../components/icons/ordered-list';
import IndentIcon from '../components/icons/indent';
import UndentIcon from '../components/icons/undent';
import { liftListItem, blockActive, getParentNodeFromState } from '../utils';
import { Extension, ExtensionProps } from '../types';
import Button from '../components/button';
import { BASE_PRIORITY } from '../constants';

export default class OrderedList extends Extension {
  constructor(props?: ExtensionProps) {
    super(props);
  }

  get name() {
    return 'ordered_list';
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
      content: 'list_item+',
      group: 'block',
      parseDOM: [
        {
          tag: 'ol',
          priority: BASE_PRIORITY,
          getAttrs(dom) {
            return {
              id: dom.getAttribute('id'),
            };
          },
        },
      ],
      attrs: {
        id: { default: '' },
      },
      toDOM(node) {
        return [
          'ol',
          {
            class: this.className,
          },
          0,
        ];
      },
    };
  }

  get icon() {
    return <OrderedListIcon style={{ width: '24px', height: '24px' }} />;
  }

  get hideBlockMenuOnFocus() {
    return true;
  }

  active(state) {
    return blockActive(state.schema.nodes.ordered_list)(state);
  }

  enable(state) {
    const node = getParentNodeFromState(state);
    if (node.type.name !== 'paragraph') {
      return false;
    }
    return wrapInList(state.schema.nodes.ordered_list)(state);
  }

  onClick(state, dispatch) {
    const node = getParentNodeFromState(state);
    if (node.type.name !== 'paragraph') {
      return false;
    }
    wrapInList(state.schema.nodes.ordered_list)(state, dispatch);
  }

  customMenu({ state, dispatch }) {
    return (
      <>
        <Button
          type="button"
          onClick={() => {
            liftListItem(state.schema.nodes.list_item)(state, dispatch);
          }}
        >
          <UndentIcon style={{ width: '24px', height: '24px' }} />
        </Button>
        <Button
          type="button"
          onClick={() => {
            sinkListItem(state.schema.nodes.list_item)(state, dispatch);
          }}
        >
          <IndentIcon style={{ width: '24px', height: '24px' }} />
        </Button>
      </>
    );
  }
}
