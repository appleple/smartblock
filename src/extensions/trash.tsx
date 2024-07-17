import * as React from 'react'
import { findChildren } from 'prosemirror-utils'
import { Extension } from '../types'
import TrashIcon from '../components/icons/trash'
import isMobile from 'is-mobile';

type Props = {
  i18n?: {
    remove_block: string;
  };
}

export default class Trash implements Extension {

  i18n = {
    remove_block: 'Are you sure you want to remove the block?'
  };

  constructor(props: Props = {}) {
    if (props && props.i18n) {
      this.i18n = props.i18n;
    }
  }

  get name() {
    return 'trash';
  }

  get group() {
    return 'edit';
  }

  get showMenu() {
    return true;
  }

  get icon() {
    return <TrashIcon style={{ width: '18px', height: '18px' }} />
  }

  get btnColor(): 'black' {
    return 'black';
  }

  onClick(state, dispatch) {
    const { selection } = state;
    const { $anchor } = selection;
    const resolvedPos = state.doc.resolve($anchor.pos) as any;
    const rowNumber = resolvedPos.path[1];
    let i = 0;
    const [firstNode] = findChildren(
      state.doc,
      _node => {
        if (rowNumber === i) {
          i++
          return true;
        }
        i++
        return false;
      },
      false
    );
    const firstIndex = firstNode.pos;
    const removeTransaction = state.tr.delete(
      firstIndex,
      firstIndex + firstNode.node.content.size + 2
    );
    if (!isMobile()) {
      dispatch(removeTransaction);
      return;
    }
    if (confirm(this.i18n.remove_block)) {
      dispatch(removeTransaction);
    }
  }
}
