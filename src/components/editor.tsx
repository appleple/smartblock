import * as React from 'react'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { useView, useScrolling } from '../utils/hooks';
import { getScrollTop } from '../utils';

const { useRef, useEffect, useState } = React;

type EditorProps = {
  onChange(
    state: EditorState,
    dispatch: typeof EditorView.prototype.dispatch
  ): any
  attributes?: any
  nodeViews?: any
  autoFocus?: boolean
  options: any
  render?({ editor: EditorState, view: EditorView, scrolling: boolean }): React.ReactElement
}

export default (props: EditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const view = useView(props);

  // Object.keys(props.options).forEach((key) => console.log(key, {...props.options[key]}))
  
  useEffect(() => {
    editorRef.current.appendChild(view.dom);
    if (props.autoFocus) {
      view.focus()
    }
  }, []);

  const scrolling = useScrolling(300);

  const editor = <div ref={editorRef} />
  return props.render({
    editor,
    view: view,
    scrolling: scrolling
  });
}


