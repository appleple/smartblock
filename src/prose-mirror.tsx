import * as React from 'react';
const { useState, useRef, useEffect, useMemo } = React;
import 'prosemirror-view/style/prosemirror.css';
import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { DOMParser } from 'prosemirror-model';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap, toggleMark } from 'prosemirror-commands';
import mySchema from './prose-schema';

export default () => {
  const divEl = useRef<HTMLDivElement>(null);
  let editorView = null as EditorView | null;
  let editorState = null as EditorState | null;

  useEffect(() => {
    if (divEl && divEl.current) {
      let editorState = EditorState.create({
        doc: DOMParser.fromSchema(mySchema).parse(divEl.current),
        plugins: [keymap(baseKeymap)]
      }) ;
      editorView = new EditorView(divEl.current, {
        state: editorState,
        dispatchTransaction: (tx: Transaction) => {
          editorState = editorState.apply(tx);
          if (editorView) {
            editorView.updateState(editorState);
          }
        }
      }); 
      return () => {
        if (editorView) {
          editorView.destroy();
        }
      };
    }
  },[]);
  return (<>
    <button onClick={() => {
      const command = toggleMark(mySchema.marks.strong);
      if (editorView) {
        command(editorView.state, (tx: Transaction) => {
          if (editorState) {
            editorState = editorState.apply(tx);
            if (editorView) {
              editorView.updateState(editorState);
            }
          }
        })
      }
    }}>test</button>
    <div ref={divEl} />
  </>);
}