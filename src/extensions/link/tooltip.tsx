import * as React from 'react'
import { EditorView } from 'prosemirror-view'
import { EditorState, Plugin } from 'prosemirror-state'
import { render, unmountComponentAtNode } from 'react-dom'
import styled from 'styled-components'
import TooltipReact from './tooltip-react'
import { getScrollTop } from '../../utils'

const TooltipWrap = styled.div<{
  pos: number
}>`
  position: absolute;
  display: inline-block;
  z-index: 1000;
  background-color: #fff;
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

const { useRef } = React
const ARROWOFFSET = 50
const ARROWTOPOFFSET = 30

const calculateStyle = (
  view: EditorView,
  container: React.RefObject<HTMLDivElement>
) => {
  const { selection } = view.state
  const app = view.dom
  const { $anchor } = view.state.selection
  const { nodeAfter } = $anchor
  let link = null

  if (nodeAfter) {
    link = nodeAfter.marks.find(mark => {
      if (mark.type.name === 'link') {
        return true
      }
    })
  }

  if (!selection || selection.empty || !app || !link) {
    return {
      left: -1000,
      top: 0
    }
  }

  const coords = view.coordsAtPos(selection.$head.pos)
  const top = coords.top + getScrollTop() + ARROWTOPOFFSET
  const left = coords.left - ARROWOFFSET

  const width = 320 // container.current.offsetWidth
  if (left + width > window.innerWidth) {
    return {
      top,
      left: window.innerWidth - width
    }
  }

  return {
    left,
    top
  }
}

const calculatePos = (
  view: EditorView,
  container: React.RefObject<HTMLDivElement>
) => {
  const { selection } = view.state
  const app = view.dom
  const { $anchor } = view.state.selection
  const { nodeAfter } = $anchor
  let link = null

  if (nodeAfter) {
    link = nodeAfter.marks.find(mark => {
      if (mark.type.name === 'link') {
        return true
      }
      return false
    })
  }

  if (!selection || selection.empty || !app || !link) {
    return 20
  }

  const coords = view.coordsAtPos(selection.$head.pos)
  const left = coords.left - ARROWOFFSET

  const width = 320 // container.current.offsetWidth
  if (left + width > window.innerWidth) {
    return left - window.innerWidth + width
  }

  return 20
}

const TooltipComponent = (props: { view: EditorView }) => {
  const { view } = props
  const container = useRef<HTMLDivElement>(null)
  const style = calculateStyle(view, container)
  const { selection } = view.state
  const { $anchor } = selection
  const { nodeBefore, nodeAfter, pos } = $anchor
  let link = null
  let editing = false
  if (nodeAfter) {
    link = nodeAfter.marks.find(mark => {
      if (mark.type.name === 'link') {
        return true
      }
    })
  }
  let url = ''
  if (link) {
    url = link.attrs.href
  }
  if (link) {
    editing = link.attrs.editing
  }
  let beforePos = selection.from
  let afterPos = selection.to
  if (beforePos === afterPos && nodeBefore && nodeAfter) {
    beforePos = pos - nodeBefore.nodeSize
    afterPos = pos + nodeAfter.nodeSize
  }
  const arrowPos = calculatePos(view, container)

  return (
    <TooltipWrap
      className="paper-editor-tooltip"
      ref={container}
      style={style}
      pos={arrowPos}
    >
      <TooltipReact
        url={url}
        editing={editing}
        onClick={href => {
          const { tr } = view.state
          tr.removeMark(beforePos, afterPos, view.state.schema.marks.link)
          if (!href) {
            view.dispatch(tr)
            return
          }
          tr.addMark(
            beforePos,
            afterPos,
            view.state.schema.marks.link.create({ href, editing: false })
          )
          view.dispatch(tr)
        }}
      />
    </TooltipWrap>
  )
}

class Tooltip {
  tooltip: HTMLDivElement

  constructor(view: EditorView) {
    this.tooltip = document.createElement('div')
    document.body.appendChild(this.tooltip)
    this.update(view, null)
  }

  render(view: EditorView) {
    render(<TooltipComponent view={view} />, this.tooltip)
  }

  update(view: EditorView, oldState: EditorState) {
    this.render(view)
  }

  destroy() {
    unmountComponentAtNode(this.tooltip)
    document.body.removeChild(this.tooltip)
  }
}

export default () => {
  return new Plugin({
    view(view) {
      return new Tooltip(view)
    }
  })
}
