import * as React from 'react';
import { setTextSelection, findChildren } from 'prosemirror-utils';
import MoveUpIcon from '../components/icons/GoUp';
import { Extension } from '../types';
import {
  findNodePosition,
  getParentNodeIndexFromState,
  getRootNodeWithPosByIndex
} from '../utils';

export default class MoveUp implements Extension {
  get name() {
    return 'move-up';
  }

  get group() {
    return 'edit';
  }

  get showMenu() {
    return true;
  }

  get icon() {
    return <MoveUpIcon style={{ width: '24px', height: '24px' }} />
  }

  enable(state) {
    return getParentNodeIndexFromState(state) >= 1;
  }

  onClick(_state, _dispatch, view) {
    const { state } = view;
    const rowNumber = getParentNodeIndexFromState(state);
    const firstNode = getRootNodeWithPosByIndex(state, rowNumber - 1);
    const secondNode = getRootNodeWithPosByIndex(state, rowNumber);
    if (firstNode) {
      const firstIndex = firstNode.pos;
      const secondIndex = secondNode.pos;
      const removeTransaction = state.tr.delete(firstIndex, secondIndex);
      view.dispatch(removeTransaction);
      const firstNode2 = removeTransaction.doc.content.child(rowNumber - 1);
      const firstIndex2 = findNodePosition(removeTransaction.doc, firstNode2);
      const insertTransaction = view.state.tr.insert(
        firstIndex2 + firstNode2.nodeSize,
        firstNode.node
      );
      view.dispatch(insertTransaction);
      view.dispatch(
        setTextSelection(firstIndex2)(view.state.tr).scrollIntoView()
      );
    }
  }
}
