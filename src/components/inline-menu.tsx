import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { EditorView } from 'prosemirror-view';
import { getOffset, getScrollTop } from '../utils';
import ButtonStyle from './button';

interface PositionProps {
  view: EditorView;
  blockMenu: any;
}

const { useState, useRef } = React;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const FloaterStyle = styled.div<{
  pos: number;
}>`
  position: absolute;
  z-index: 12;
  animation: ${fadeIn} 0.3s;
  margin-top: 8px;
  border-radius: 5px;
  background-color: #fff;
  color: #fff;
  box-shadow: 0 3px 40px 8px rgba(116, 116, 116, 0.2);
  &:before {
    position: absolute;
    ${props => `
    left: ${props.pos}px;
    `}
    top: -12px;
    content: '';
    display: block;
    border-style: solid;
    border-width: 0 12px 12px 12px;
    border-color: transparent transparent #ffffff transparent;
  }
`

const Bar = styled.div`
  padding: 5px;
  display: flex;
  align-items: baseline;
`

const ARROWOFFSET = 50;
const ARROWTOPOFFSET = 25;

const calculateStyle = (
  view: EditorView,
  container: React.RefObject<HTMLDivElement>
) => {
  const { selection } = view.state;
  const offsetLeft = getOffset(view.dom).left;
  const coords = view.coordsAtPos(selection.$head.pos);
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
  children?: React.ReactChildren;
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

  return (
    <FloaterStyle style={style} ref={container} pos={pos}>
      <Bar>
        {children}
        {menu.map((item, key) => {
          return (
            <ButtonStyle
              key={`inline-${key}`}
              type="button"
              active={item.active && item.active(state)}
              title={item.title}
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
            </ButtonStyle>
          )
        })}
        {inlineMenu && inlineMenu.props && inlineMenu.props.children && (
          <>{inlineMenu}</>
        )}
      </Bar>
    </FloaterStyle>
  )
}

export default MenuBar
