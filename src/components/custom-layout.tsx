import * as React from 'react'
import { EditorView } from 'prosemirror-view'
import imagesLoaded from 'imagesloaded'
import {
  getParentNodeFromState,
  findNodePosition,
  calculateStyle
} from '../utils'
import { Extension } from '../types'

const { useState, useEffect } = React

interface CustomLayoutProps {
  view: EditorView
  menu: Extension[]
}

const getCustomLayout = (props: CustomLayoutProps) => {
  const { menu, view } = props
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
    return null
  }
  if (selectedItem.customLayout) {
    return selectedItem.customLayout
  }
  return null
}

const useImagesLoaded = (dom: HTMLElement) => {
  const [size, setSize] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0
  })
  useEffect(() => {
    imagesLoaded(dom, () => {
      const newSize = dom.getBoundingClientRect()
      if (size.height !== newSize.height) {
        setSize(newSize)
      }
    })
  })
  return size
}

export default (props: CustomLayoutProps) => {
  const customLayout = getCustomLayout(props)
  if (!customLayout) {
    return null
  }
  const { view } = props
  const pos = calculateStyle(props.view)
  const parentNode = getParentNodeFromState(view.state)
  const parentPos = findNodePosition(view.state.doc, parentNode)
  const dom = view.nodeDOM(parentPos) as HTMLElement
  const style = {
    position: 'absolute',
    zIndex: '10',
    top: pos.top,
    left: 0,
    right: 0
  }

  const size = useImagesLoaded(dom)

  if (!size.height) {
    return null
  }

  return <div style={style}>{customLayout(props.view, dom)}</div>
}
