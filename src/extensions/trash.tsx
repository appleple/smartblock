import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/fontawesome-free-solid'
import { findChildren } from 'prosemirror-utils';
import { Extension } from '../types';

export default class Trash implements Extension {
  get name() {
    return 'trash';
  }
  get showMenu() {
    return true;
  }
  get schema() {
    return {
      group: 'block'
    }
  }
  get icon() {
    return <FontAwesomeIcon icon={faTrash} />
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