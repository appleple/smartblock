import * as React from 'react';
import { findChildren } from 'prosemirror-utils';
import { EditorView } from 'prosemirror-view';
import { getOffset, getParentNodeFromState } from '../utils';
import Button from './button';
import { Extension } from '..';

const { useState, useEffect } = React;

interface PositionProps {
  view: EditorView;
  menu: Extension[];
}

const calculateStyle = (props: PositionProps): React.CSSProperties => {
  const { view } = props;
  const { state } = view;
  const { selection } = state;

  if (!selection || !selection.empty) {
    return {
      top: -1000,
      right: 0
    }
  }

  const { $anchor } = selection;

  if ($anchor.pos === 0) {
    return {
      top: -1000,
      right: 0
    }
  }

  const resolvedPos = state.doc.resolve($anchor.pos) as any;
  const rowNumber = resolvedPos.path[1];
  let i = 0;
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
  const offsetTop = getOffset(view.dom).top;

  if (coords.top === 0) {
    return {
      top: -1000
    }
  }
  if (dom && dom.offsetHeight) {
    return {
      left: 5,
      top: elementTop + dom.offsetHeight - offsetTop + 20
    }
  }
  return {
    left: 5,
    top: elementTop - offsetTop + 20
  }
}

const getActiveMenu = (props: PositionProps) => {
  const { menu, view } = props;
  const { state } = view;

  const activeItem = menu.find(item => {
    if (item.active && item.active(state)) {
      return true;
    }
    return false;
  })
  if (activeItem && activeItem.customMenu) {
    return <>{activeItem.customMenu(view)}</>
  }
  return <></>
}

const shouldRenderMenu = (props: PositionProps) => {
  const { menu, view } = props;
  const node = getParentNodeFromState(view.state);
  if (!node || !menu || !menu.length) {
    return;
  }
  const { name } = node.type
  const selectedItem = menu.find(item => {
    if (item.name === name) {
      return true;
    }
    return false;
  })
  if (!selectedItem) {
    return true;
  }
  if (selectedItem.hideMenuOnFocus) {
    return false;
  }
  return true;
}

export default function Menu (props: PositionProps) {
  const { menu, view } = props;
  const { state, dispatch } = view;
  const CustomMenu = getActiveMenu(props);
  const shouldRender = shouldRenderMenu(props);
  const [style, setState] = useState<React.CSSProperties>({
    left: 0,
    top: 0
  });

  useEffect(() => {
    const nextStyle = calculateStyle(props);
    setState(nextStyle);
  }, [props]);

  if (!shouldRender) {
    return null;
  }

  let hideMenuOnFocus = false;
  const activeItem = menu.find(item => {
    if (item.active && item.active(state)) {
      return true;
    }
    return false;
  });

  if (activeItem && activeItem.hideBlockMenuOnFocus) {
    hideMenuOnFocus = true;
  }

  return (
    <div style={style} className="smartblock-menu">
      <div className="smartblock-menu-top">
        {menu.map((item, key) => {
          if (item.customButton) {
            return React.cloneElement(item.customButton({ state, dispatch }), { key });
          }
          return (
            <Button
              key={key}
              type="button"
              active={item.active && item.active(state)}
              disabled={(item.enable && !item.enable(state)) || hideMenuOnFocus}
              onClick={e => {
                e.preventDefault();
                item.onClick(state, dispatch, view);
              }}
            >
              {typeof item.icon !== 'string' ? (
                item.icon
              ) : (
                <span dangerouslySetInnerHTML={{ __html: item.icon }} />
              )}
            </Button>
          )
        })}
      </div>
      {CustomMenu && CustomMenu.props && CustomMenu.props.children && (
        <div className="smartblock-custom-menu">{CustomMenu}</div>
      )}
    </div>
  )
}
