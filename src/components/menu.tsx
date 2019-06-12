import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import { findChildren } from 'prosemirror-utils'
import { EditorView } from 'prosemirror-view'
import map from 'lodash/map'
import { getOffset, getParentNodeFromState } from '../utils'
import ButtonStyle from './button'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const PositionBtnGroup = styled.div`
  position: absolute;
  z-index: 10;
  animation: ${fadeIn} 0.3s;
  border-radius: 5px;
  box-shadow: 0 3px 40px 8px rgba(116, 116, 116, 0.2);
  padding: 5px 0;
  color: #767676;
  background-color: #fff;
  &:before {
    position: absolute;
    left: 20px;
    top: -12px;
    content: '';
    display: block;
    border-style: solid;
    border-width: 0 11.5px 12px 11.5px;
    border-color: transparent transparent #ffffff transparent;
  }
`

const PositionBtnGroupTop = styled.div`
  padding: 0 5px 5px 5px;
`
const PositionBtnGroupBottom = styled.div`
  border-top: 1px solid #ccc;
  padding: 5px 5px 0 5px;
`

interface PositionProps {
  view: EditorView
  menu: any
}

interface PositionState {
  style: React.CSSProperties
}

export default class Menu extends React.Component<
  PositionProps,
  PositionState
> {
  menuRef: React.RefObject<HTMLDivElement>

  constructor(props) {
    super(props)
    this.state = {
      style: {
        left: 0,
        top: 0
      }
    }
    this.menuRef = React.createRef()
  }

  calculateStyle(props: PositionProps) {
    const { view } = this.props
    const { state } = view
    const { selection } = state

    if (!selection || !selection.empty) {
      return {
        left: -1000,
        top: 0
      }
    }

    const { $anchor } = selection

    if ($anchor.pos === 0) {
      return {
        right: -1000,
        top: 0
      }
    }
    
    const resolvedPos = state.doc.resolve($anchor.pos) as any
    const rowNumber = resolvedPos.path[1]
    let i = 0
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
    const offsetTop = getOffset(view.dom).top

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

  componentDidMount() {
    this.setState({
      style: this.calculateStyle(this.props)
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      style: this.calculateStyle(nextProps)
    })
  }

  getActiveMenu() {
    const { menu, view } = this.props
    const { state } = view

    const activeItem = menu.find(item => {
      if (item.active && item.active(state)) {
        return true
      }
      return false
    })
    if (activeItem && activeItem.customMenu) {
      return <>{activeItem.customMenu(view)}</>
    }
    return <></>
  }

  shouldRenderMenu() {
    const { menu, view } = this.props
    const node = getParentNodeFromState(view.state)
    if (!node || !menu || !menu.length) {
      return
    }
    const { name } = node.type
    const selectedItem = menu.find(item => {
      if (item.name === name) {
        return true
      }
      return false
    })
    if (!selectedItem) {
      return true
    }
    if (selectedItem.hideMenuOnFocus) {
      return false
    }
    return true
  }

  render() {
    const { style } = this.state
    const { menu, view } = this.props
    const { state, dispatch } = view
    const CustomMenu = this.getActiveMenu()
    const shouldRender = this.shouldRenderMenu()

    if (!shouldRender) {
      return null
    }

    return (
      <PositionBtnGroup style={style} ref={this.menuRef}>
        <PositionBtnGroupTop>
          {menu.map((item, key) => {
            return (
              <ButtonStyle
                key={key}
                type="button"
                active={item.active && item.active(state)}
                title={item.title}
                disabled={item.enable && !item.enable(state)}
                onMouseDown={e => {
                  e.preventDefault()
                  item.onClick(state, dispatch, view)
                }}
              >
                {item.icon}
              </ButtonStyle>
            )
          })}
        </PositionBtnGroupTop>
        {CustomMenu && CustomMenu.props && CustomMenu.props.children && (
          <PositionBtnGroupBottom>{CustomMenu}</PositionBtnGroupBottom>
        )}
      </PositionBtnGroup>
    )
  }
}
