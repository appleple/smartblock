import * as React from 'react';
import Icon from '../components/icon';
import { wrapInList, sinkListItem } from 'prosemirror-schema-list'
import uuid from 'uuid';
import undentSvg from '../assets/images/icons/undent.svg';
import indentSvg from '../assets/images/icons/indent.svg';
import listSvg from '../assets/images/icons/list.svg';
import { liftListItem } from '../utils';
import { Extension } from '../types';
import { blockActive } from '../utils';
import Button from '../components/button';

export default class BulletList implements Extension {
  get name() {
    return 'bullet_list';
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
      parseDOM: [{tag: "ul", getAttrs(dom) {
        return {
          id: dom.getAttribute('id')
        }
      }}],
      attrs: {
        id: { default: '' }
      },
      toDOM(node) { return ["ul", {
        id: node.attrs.id || uuid()
      }, 0] }
    }
  }
  get icon() {
    return <Icon src={listSvg} width={24} height={24} />
  }
  active(state) {
    return blockActive(state.schema.nodes.bullet_list)(state)
  }
  enable(state) {
    return wrapInList(state.schema.nodes.bullet_list)(state);
  }
  onClick (state, dispatch) {
    wrapInList(state.schema.nodes.bullet_list)(state, dispatch);
  }
  customMenu({ state, dispatch }) {

    return (<><Button onClick={() => {
      liftListItem(state.schema.nodes.list_item)(state, dispatch);
    }}><Icon src={undentSvg} width={24} height={24} /></Button>
    <Button onClick={() => {
      sinkListItem(state.schema.nodes.list_item)(state, dispatch);
    }}><Icon src={indentSvg} width={24} height={24} /></Button>
    </>)
  }
}