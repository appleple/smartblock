import * as React from 'react';
import Icon from '../components/icon';
import trash from '../assets/images/icons/trash.svg';
import { findChildren } from 'prosemirror-utils';
import { Extension } from '../types';

export default class Trash implements Extension {
  get name() {
    return 'trash';
  }
  get group() {
    return "edit"
  }
  get showMenu() {
    return true;
  }
  get icon() {
    return <Icon src={trash} width={24} height={24} />
  }
  onClick (state, dispatch) {
    const { selection } = state;
    const { $anchor } = selection;
    const resolvedPos = state.doc.resolve($anchor.pos) as any;
    const rowNumber = resolvedPos.path[1];
    let i = 0;
    const [ firstNode ] = findChildren(state.doc, (_node) => {
      if (rowNumber === i) {
        i++;
        return true;
      }
      i++;
      return false;
    }, false);
    const firstIndex = firstNode.pos;
    const removeTransaction = state.tr.delete(firstIndex, firstIndex + firstNode.node.content.size + 2);
    dispatch(removeTransaction);
  }
}