import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import { findChildren } from 'prosemirror-utils'
import { EditorView } from 'prosemirror-view'
import { getOffset } from '../utils'
import ButtonStyle from './button'

const { useState, useEffect } = React;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const PositionBtnGroup = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  z-index: 10;
  max-width: 280px;
  animation: ${fadeIn} 0.3s;
  border-radius: 5px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  padding: 4px;
  background-color: #f2f2f4;
`

const Button = styled(ButtonStyle)`
  margin: 3px;
  width: 36px;
  height: 36px;
  ${props => {
    if (props.color === 'black') {
      return `
        background-color: #333333 !important;
        color: #FFF;
      `
    } else {
      return `
        background-color: transparent;
        color: #333;
      `
    }
  }}
  &:last-child {
    margin-right: 2px;
  }
`

interface PositionProps {
  view: EditorView
  menu: any
}

const getContainerOffset = container => {
  return getOffset(container).top
}

const calculateStyle = (props: PositionProps) => {
  const { view } = props
  const { state } = view
  const { selection } = state

  if (!selection) {
    return {
      right: -1000,
      top: 0
    }
  }

  const { $anchor } = selection
  const resolvedPos = state.doc.resolve($anchor.pos) as any
  const rowNumber = resolvedPos.path[1]
  let i = 0
  if ($anchor.pos === 0) {
    return {
      right: -1000,
      top: 0
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

  const coords = view.coordsAtPos(firstNode.pos)
  const dom = view.nodeDOM(firstNode.pos) as HTMLElement
  const elementTop = getOffset(dom).top
  const offsetTop = getContainerOffset(view.dom)

  if (coords.top === 0) {
    return {
      top: -1000
    }
  }
  return {
    right: 20,
    top: elementTop - offsetTop - 40
  }
}

export default (props: PositionProps) => {
  const [style, setState] = useState<React.CSSProperties>({
    right: 20,
    top: 0
  });

  const { menu, view } = props
  const { state, dispatch } = view

  useEffect(() => {
    const nextStyle = calculateStyle(props);
    setState(nextStyle);
  }, [props]);

  return (
    <PositionBtnGroup style={style}>
      {menu.map((item, key) => {
        return (
          <Button
            key={`edit-${key}`}
            type="button"
            color={item.btnColor}
            active={item.active && item.active(state)}
            title={item.title}
            disabled={item.enable && !item.enable(state)}
            onMouseDown={e => {
              e.preventDefault()
              item.onClick(state, dispatch, view)
            }}
          >
            {item.icon}
          </Button>
        )
      })}
    </PositionBtnGroup>
  )
}
