import { useEffect, useMemo, useRef, useState } from 'react';
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

export const useView = (props: EditorProps): EditorView | null => {
  const forceUpdate = useForceUpdate();
  const instanceRef = useRef<InstanceType<typeof EditorView> | null>(null);

  useEffect(() => {
    const view = new EditorView(null, {
      state: EditorState.create(props.options),
      dispatchTransaction: (transaction) => {
        const { state, transactions } = view.state.applyTransaction(transaction);
        view.updateState(state);

        if (transactions.some((tr) => tr.docChanged)) {
          props.onChange(state, view.dispatch);
        }

        // 更新を促す（メニュー等の再レンダリング）
        forceUpdate();
      },
      attributes: props.attributes,
      nodeViews: props.nodeViews,
    });

    // 初期状態でも onChange を呼びたい場合
    props.onChange(view.state, view.dispatch);

    instanceRef.current = view;

    // 初回表示時のforceUpdate（メニューやUI表示用）
    forceUpdate();

    // アンマウント時に破棄
    return () => {
      view.destroy();
      instanceRef.current = null;
    };
    // propsは必要なものだけ依存に含める
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return instanceRef.current;
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
    // 初回マウント時のみ実行したいため、eslint-disable-next-lineで無効化
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return scrolling;
};
