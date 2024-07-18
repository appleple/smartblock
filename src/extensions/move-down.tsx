import * as React from 'react';
import { setTextSelection } from 'prosemirror-utils';
import MoveDownIcon from '../components/icons/go-down';
import { Dispatch, Extension } from '../types';
import {
  findNodePosition,
  getParentNodeIndexFromState,
  getRootNodeWithPosByIndex,
  getRootNodeCountFromState
} from '../utils';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

export default class MoveDown implements Extension {
  get name() {
    return 'move-down';
  }

  get group() {
    return 'edit';
  }

  get showMenu() {
    return true;
  }

  get icon() {
    return <MoveDownIcon style={{ width: '24px', height: '24px' }} />
  }

  enable(state: EditorState) {
    const length = getRootNodeCountFromState(state);
    const rowNumber = getParentNodeIndexFromState(state);
    return rowNumber < length - 1;
  }

  onClick(_state: EditorState, _dispatch: Dispatch, view: EditorView) {
    const { state } = view;
    const rowNumber = getParentNodeIndexFromState(state);
    const firstNode = getRootNodeWithPosByIndex(state, rowNumber);
    const secondNode = getRootNodeWithPosByIndex(state, rowNumber + 1);
    if (secondNode) {
      const firstIndex = firstNode.pos;
      const secondIndex = secondNode.pos;
      const removeTransaction = state.tr.delete(firstIndex, secondIndex);
      view.dispatch(removeTransaction);
      const firstNode2 = removeTransaction.doc.content.child(rowNumber);
      const firstIndex2 = findNodePosition(removeTransaction.doc, firstNode2);
      const insertTransaction = view.state.tr.insert(
        firstIndex2 + firstNode2.nodeSize,
        firstNode.node
      );
      view.dispatch(insertTransaction);
      view.dispatch(
        setTextSelection(firstIndex2 + firstNode2.nodeSize)(
          view.state.tr
        ).scrollIntoView()
      );
    }
  }
}
