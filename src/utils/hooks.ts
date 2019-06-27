import { useEffect, useRef, useMemo, useState, RefObject, SyntheticEvent } from 'react';
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { getScrollTop, getScrollLeft } from './';

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


export const useScroll = () => {
  const [scrollTop, setScrollTop] = useState(getScrollTop());
  useEffect(() => {
    const scrollEvent = () => {
      setScrollTop(getScrollTop())
    };
    window.addEventListener('scroll', scrollEvent);
    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, [scrollTop]);
  return scrollTop;
}

export const useScrolling = (delay: number) => {
  const [scrolling, setScrolling] = useState(false);
  useEffect(() => {
    let debounceTimer = null;
    const eventHandler = () => {
      if (scrolling === false) {
        setScrolling(true);
      }
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        setScrolling(false);
      }, delay);
    }
    window.addEventListener('scroll', eventHandler);
    return (() => {
      window.removeEventListener('scroll', eventHandler);
    })
  }, []);
  return scrolling;
}
