import * as React from 'react';
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
const { useMemo, useState } = React;

type EditorProps = {
  onChange(
    state: EditorState,
    dispatch: typeof EditorView.prototype.dispatch
  ): any
  attributes?: any
  nodeViews?: any
  autoFocus?: boolean
  options: any
  render?({ editor: EditorState, view: EditorView }): React.ReactElement
}

export const useForceUpdate = () => {
  const [, setTick] = useState(0);
  const update = () => {
    setTick(tick => tick + 1);
  }
  return update;
}

export const useView = (props: EditorProps): EditorView => {
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