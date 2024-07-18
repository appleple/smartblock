import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import { undo, undoDepth } from 'prosemirror-history';
import UndoIcon from './icons/undo';

interface Props {
  view: EditorView;
}


export default function BackBtn (props: Props) {
  const { state, dispatch } = props.view;

  const depth = undoDepth(state);

  if (!depth) {
    return <></>;
  }

  return (
    <button
      className="smartblock-backbtn"
      onClick={() => {
        undo(state, dispatch)
      }}
    >
      <UndoIcon style={{ width: '24px', height: '24px' }} />
    </button>
  )
}
