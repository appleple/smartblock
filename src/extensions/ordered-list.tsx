import * as React from 'react';
import { wrapInList, sinkListItem } from 'prosemirror-schema-list';
import OrderedListIcon from '../components/icons/ordered-list';
import IndentIcon from '../components/icons/indent';
import UndentIcon from '../components/icons/undent';
import { liftListItem, blockActive, getParentNodeFromState } from '../utils';
import { Dispatch, Extension, ExtensionProps } from '../types';
import Button from '../components/button';
import { BASE_PRIORITY } from '../constants';
import { Node } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';

export default class OrderedList extends Extension {
  constructor(props?: ExtensionProps) {
    super(props);
  }

  // @ts-ignore
  get name() {
    return 'ordered_list';
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
      content: 'list_item+',
      group: 'block',
      parseDOM: [
        {
          tag: 'ol',
          priority: BASE_PRIORITY,
          getAttrs(dom: HTMLElement) {
            return {
              id: dom.getAttribute('id'),
            };
          },
        },
      ],
      attrs: {
        id: { default: '' },
      },
      toDOM(node: Node) {
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

  // @ts-ignore
  get icon() {
    return <OrderedListIcon style={{ width: '24px', height: '24px' }} />;
  }

  // @ts-ignore
  get hideBlockMenuOnFocus() {
    return true;
  }

  active(state: EditorState) {
    return blockActive(state.schema.nodes.ordered_list)(state);
  }

  enable(state: EditorState) {
    const node = getParentNodeFromState(state);
    if (node.type.name !== 'paragraph') {
      return false;
    }
    return wrapInList(state.schema.nodes.ordered_list)(state);
  }

  onClick(state: EditorState, dispatch: Dispatch) {
    const node = getParentNodeFromState(state);
    if (node.type.name !== 'paragraph') {
      return false;
    }
    wrapInList(state.schema.nodes.ordered_list)(state, dispatch);
  }

  customMenu({ state, dispatch }: { state: EditorState; dispatch: Dispatch }) {
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
