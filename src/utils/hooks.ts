import { useEffect, useMemo, useState } from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { getScrollTop } from '.';
import { EditorProps } from '../components/editor';

export const useForceUpdate = () => {
  const [, setTick] = useState(0);
  const update = () => {
    setTick((tick) => tick + 1);
  };
  return update;
};

export const useView = (props: EditorProps): EditorView => {
  const forceUpdate = useForceUpdate();
  const instance = useMemo(() => {
    const view = new EditorView(null, {
      state: EditorState.create(props.options),
      dispatchTransaction: (transaction) => {
        const { state, transactions } = view.state.applyTransaction(transaction);
        view.updateState(state);
        if (transactions.some((tr) => tr.docChanged)) {
          props.onChange(state, view.dispatch);
        }
        forceUpdate();
      },
      attributes: props.attributes,
      nodeViews: props.nodeViews,
    });
    return view;
    // forceUpdate を依存配列に追加すると無限ループになる
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // 初回表示時にメニューと編集メニューが表示されない問題を解消するために追加
    forceUpdate();
  }, []);
  return instance;
};

export const useScroll = () => {
  const [scrollTop, setScrollTop] = useState(getScrollTop());
  useEffect(() => {
    const scrollEvent = () => {
      setScrollTop(getScrollTop());
    };
    window.addEventListener('scroll', scrollEvent);
    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, [scrollTop]);
  return scrollTop;
};

export const useScrolling = (element: React.MutableRefObject<HTMLDivElement>, delay: number) => {
  const [scrolling, setScrolling] = useState(false);
  useEffect(() => {
    let debounceTimer: ReturnType<typeof setTimeout>;
    let count = 0;
    if (!element.current) {
      return;
    }
    let { top } = element.current.getBoundingClientRect();
    const eventHandler = () => {
      const localTop = element.current.getBoundingClientRect().top;
      if (localTop === top) {
        return;
      }
      top = localTop;
      count++;
      if (count === 3) {
        if (scrolling === false) {
          count = 0;
          setScrolling(true);
        }
      }
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        setScrolling(false);
        count = 0;
      }, delay);
    };
    const interval = setInterval(eventHandler, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return scrolling;
};
