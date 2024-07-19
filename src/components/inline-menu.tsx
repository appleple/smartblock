import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import { getOffset, getScrollTop } from '../utils';
import Button from './button';

interface PositionProps {
  view: EditorView;
  blockMenu: any;
}

const { useRef } = React;

const ARROWOFFSET = 50;
const ARROWTOPOFFSET = 25;

const calculateStyle = (
  view: EditorView,
  container: React.RefObject<HTMLDivElement>
) => {
  const { selection } = view.state;
  const isSelectionToLeft = selection.$head.pos < selection.$anchor.pos;
  const offsetLeft = getOffset(view.dom).left;
  const coords = view.coordsAtPos(selection.$head.pos, isSelectionToLeft ? 0 : -1);
  const offsetTop = getOffset(view.dom).top;
  const top = coords.top + getScrollTop() + ARROWTOPOFFSET - offsetTop;
  const left = coords.left - ARROWOFFSET - offsetLeft;
  if (container && container.current && container.current.offsetWidth) {
    const width = container.current.offsetWidth;
    if (left + width > window.innerWidth) {
      return {
        top,
        left: window.innerWidth - width
      }
    }
  }
  return {
    left,
    top
  }
}

const getActiveInlineMenu = (props: PositionProps) => {
  const { blockMenu, view } = props;
  const { state } = view;

  const activeItem = blockMenu.find(item => {
    if (item.active && item.active(state)) {
      return true;
    }
    return false;
  })

  if (activeItem && activeItem.customInlineMenu) {
    return <>{activeItem.customInlineMenu(view)}</>
  }
  return false;
}

const calculateArrowPos = (
  view: EditorView,
  container: React.RefObject<HTMLDivElement>
) => {
  const { selection } = view.state;
  const offsetLeft = getOffset(view.dom).left;
  const coords = view.coordsAtPos(selection.$head.pos);
  const left = coords.left - ARROWOFFSET - offsetLeft;
  const width = container.current ? container.current.offsetWidth : 0
  if (container && container.current && container.current.offsetWidth) {
    if (left + width > window.innerWidth) {
      return left - window.innerWidth + width;
    }
  }
  return 20;
}

const MenuBar = ({
  menu,
  blockMenu,
  children,
  view
}: {
  menu: any;
  blockMenu: any;
  children?: React.ReactNode;
  view: EditorView;
}) => {
  const { state, dispatch } = view
  const { selection } = view.state
  const container = useRef<HTMLDivElement>(null)
  const style = calculateStyle(view, container)
  const pos = calculateArrowPos(view, container)
  const inlineMenu = getActiveInlineMenu({ blockMenu, view });

  if (!selection || selection.empty) {
    return <></>
  }

  if (menu.length === 0) {
    return <></>
  }

  return (
    <div style={style} ref={container} className="smartblock-inline-menu">
      <div
        className="smartblock-inline-menu-arrow"
        style={{left: `${pos}px`}}
      >
      </div>
      <div className="smartblock-inline-menu-inner">
        {children}
        {menu.map((item, key) => {
          return (
            <Button
              key={`inline-${key}`}
              type="button"
              active={item.active && item.active(state)}
              // title={item.title}
              disabled={item.enable && !item.enable(state)}
              onClick={e => {
                e.preventDefault()
                item.onClick(state, dispatch)
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
        {inlineMenu && inlineMenu.props && inlineMenu.props.children && (
          <>{inlineMenu}</>
        )}
      </div>
    </div>
  )
}

export default MenuBar;
