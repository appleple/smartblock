import * as React from 'react';
import { findChildren } from 'prosemirror-utils';
import { EditorView } from 'prosemirror-view';
import { getOffset } from '../utils';
import Button from './button';
import { Extension } from '..';

const { useState, useEffect } = React;

interface PositionProps {
  view: EditorView;
  menu: Extension[];
}

const getContainerOffset = container => {
  return getOffset(container).top;
}

const calculateStyle = (props: PositionProps, container: HTMLElement) => {
  const { view } = props;
  const { state } = view;
  const { selection } = state;

  if (!selection) {
    return {
      top: -1000
    }
  }

  const { $anchor } = selection;
  const resolvedPos = state.doc.resolve($anchor.pos) as any;
  const rowNumber = resolvedPos.path[1];
  let i = 0;
  if ($anchor.pos === 0) {
    return {
      top: -1000
    }
  }
  const [firstNode] = findChildren(
    state.doc,
    _node => {
      if (rowNumber === i || rowNumber + 1 === i) {
        i++
        return true
      }
      i++
      return false
    },
    false
  )

  if (!firstNode) {
    return {
      top: -1000
    }
  }

  const coords = view.coordsAtPos(firstNode.pos);
  const dom = view.nodeDOM(firstNode.pos) as HTMLElement;
  const elementTop = getOffset(dom).top;
  const offsetTop = getContainerOffset(view.dom);

  if (coords.top === 0) {
    return {
      top: -1000
    }
  }
  return {
    right: 20,
    top: elementTop - offsetTop - container.offsetHeight
  }
}

export default function EditMenu (props: PositionProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [style, setState] = useState<React.CSSProperties>({
    right: 20,
    top: 0
  });

  const { menu, view } = props;
  const { state, dispatch } = view;

  useEffect(() => {
    if (ref.current) {
      const nextStyle = calculateStyle(props, ref.current);
      setState(nextStyle);
    }
  }, [props]);

  return (
    <div style={style} ref={ref} className="smartblock-edit-menu">
      {menu.map((item, key) => {
        return (
          <Button
            className="smartblock-edit-btn"
            key={`edit-${key}`}
            type="button"
            color={item.btnColor}
            active={item.active && item.active(state)}
            disabled={item.enable && !item.enable(state)}
            onClick={e => {
              e.preventDefault();
              item.onClick(state, dispatch, view);
            }}
          >
            {item.icon}
          </Button>
        )
      })}
    </div>
  )
}
