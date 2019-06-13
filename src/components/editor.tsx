import * as React from 'react'
import { EditorState, TextSelection } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import 'prosemirror-view/style/prosemirror.css'

const { useMemo, useRef, useEffect, useState } = React;

type EditorProps = {
  onChange(
    state: EditorState,
    dispatch: typeof EditorView.prototype.dispatch
  ): any
  attributes?: any
  nodeViews?: any
  autoFocus?: boolean
  options: any
  render?({ editor: EditorState, view: EditorView }): React.ReactNode
}

const useForceUpdate = () => {
  const [, setTick] = useState(0);
  const update = () => {
    setTick(tick => tick + 1);
  }
  return update;
}

const useView = (props: EditorProps) => {
  const forceUpdate = useForceUpdate();
  const instance = useMemo(() => {
    const view = new EditorView(null, {
      state: EditorState.create(props.options),
      dispatchTransaction: transaction => {
        const { state, transactions } = view.state.applyTransaction(
          transaction
        )
        view.updateState(state)
        if (transactions.some(tr => tr.docChanged)) {
          props.onChange(state, view.dispatch)
        }
        forceUpdate();
      },
      attributes: props.attributes,
      nodeViews: props.nodeViews
    });
    props.onChange(view.state, view.dispatch);
    return view;
  }, []);
  return instance;
}

export default (props: EditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const view = useView(props);
  
  useEffect(() => {
    editorRef.current.appendChild(view.dom);
    if (props.autoFocus) {
      view.focus()
    }
  }, []);

  const editor = <div ref={editorRef} />
  return props.render
    ? props.render({
        editor,
        view: view
      })
    : editor
}


