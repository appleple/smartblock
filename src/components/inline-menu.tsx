import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import { EditorView } from 'prosemirror-view'
import { getOffset, getScrollTop } from '../utils'
import ButtonStyle from './button'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const FloaterStyle = styled.div`
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
    left: 20px;
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

const calculateStyle = (view: EditorView) => {
  const { selection } = view.state
  if (!selection || selection.empty) {
    return {
      left: -1000,
      top: 0
    }
  }

  const left = getOffset(view.dom).left
  const coords = view.coordsAtPos(selection.$head.pos);
  const offsetTop = getOffset(view.dom).top;

  if (window.innerWidth <= 767) {
    return {
      left: 5,
      top: coords.top + getScrollTop() + ARROWTOPOFFSET - offsetTop
    }
  }

  return {
    left: coords.left - ARROWOFFSET - left,
    top: coords.top + getScrollTop() + ARROWTOPOFFSET - offsetTop
  }
}

const getContainerOffset = container => {
  return getOffset(container).top
}

const MenuBar = ({
  menu,
  children,
  view
}: {
  menu: any
  children?: React.ReactChildren
  view: EditorView
}) => {
  const offsetTop = getContainerOffset(view.dom)
  const style = calculateStyle(view)
  const { state, dispatch } = view

  return (
    <FloaterStyle style={style}>
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
              {item.icon}
            </ButtonStyle>
          )
        })}
      </Bar>
    </FloaterStyle>
  )
}

export default MenuBar
