import * as React from 'react';
import Icon from '../components/icon';
import undentSvg from '../assets/images/icons/undent.svg';
import indentSvg from '../assets/images/icons/indent.svg';
import orderedList from '../assets/images/icons/ordered-list.svg';
import { wrapInList, sinkListItem } from 'prosemirror-schema-list'
import uuid from 'uuid';
import { liftListItem } from '../utils';
import { Extension } from '../types';
import { blockActive } from '../utils';
import Button from '../components/button';

export default class OrderedList implements Extension {
  get name() {
    return 'ordered_list';
  }
  get group() {
    return 'block'
  }
  get showMenu() {
    return true;
  }
  get schema() {
    return {
      content: 'list_item+',
      group: 'block',
      parseDOM: [{tag: "ol", getAttrs(dom) {
        return {
          id: dom.getAttribute('id')
        }
      }}],
      attrs: {
        id: { default: '' }
      },
      toDOM(node) { return ["ol", {
        id: node.attrs.id || uuid()
      }, 0] }
    }
  }
  get icon() {
    return <Icon src={orderedList} width={24} height={24} />
  }
  active(state) {
    return blockActive(state.schema.nodes.ordered_list)(state)
  }
  enable(state) {
    return wrapInList(state.schema.nodes.ordered_list)(state);
  }
  onClick (state, dispatch) {
    wrapInList(state.schema.nodes.ordered_list)(state, dispatch);
  }
  customMenu({ state, dispatch }) {
    return (<>
      <Button 
        type="button"
        onClick={() => {
          liftListItem(state.schema.nodes.list_item)(state, dispatch);
        }}><Icon src={undentSvg} width={24} height={24} />
      </Button>
      <Button 
        type="button"
        onClick={() => {
          sinkListItem(state.schema.nodes.list_item)(state, dispatch);
        }}><Icon src={indentSvg} width={24} height={24} />
      </Button>
    </>)
  }
}