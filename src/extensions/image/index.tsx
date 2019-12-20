import * as React from 'react'
import { setBlockType } from 'prosemirror-commands'
import uuid from 'uuid'
import { Extension, ExtensionProps } from '../../types'
import { blockActive, getParentNodeFromState } from '../../utils'
import Button from '../../components/button'

export default class Image extends Extension {
  constructor(props?: ExtensionProps) {
    super(props)
  }

  get name() {
    return 'image'
  }

  get group() {
    return 'block'
  }

  get showMenu() {
    return true
  }

  get schema() {
    if (this.customSchema) {
      return this.customSchema
    }
    return {
      content: 'inline*',
      group: 'block',
      defining: true,
      parseDOM: [
        {
          tag: 'img',
          getAttrs(dom) {
            return {
              id: dom.getAttribute('id') || uuid(),
              src: dom.getAttribute('src')
            }
          }
        }
      ],
      attrs: {
        src: { default: '' },
        id: { default: '' }
      },
      toDOM(node) {
        return [
          'img',
          {
            id: node.attrs.id || uuid(),
            src: node.attrs.src
          },
          0
        ]
      }
    }
  }

  get icon() {
    return <HeadingIcon style={{ width: '24px', height: '24px' }} />
  }

  active(state) {
    return blockActive(state.schema.nodes.heading6)(state)
  }

  enable(state) {
    return setBlockType(state.schema.nodes.heading6)(state)
  }

  customMenu({ state, dispatch }) {
    const node = getParentNodeFromState(state)
    return (
      <>
        <Button
          active={node && node.attrs.align === 'left'}
          type="button"
          onClick={() => {
            setBlockType(state.schema.nodes.heading6, {
              align: 'left'
            })(state, dispatch)
          }}
        >
          <AlignLeftIcon style={{ width: '24px', height: '24px' }} />
        </Button>
        <Button
          type="button"
          active={node && node.attrs.align === 'center'}
          onClick={() => {
            setBlockType(state.schema.nodes.heading6, {
              align: 'center'
            })(state, dispatch)
          }}
        >
          <AlignCenterIcon style={{ width: '24px', height: '24px' }} />
        </Button>
        <Button
          type="button"
          active={node && node.attrs.align === 'right'}
          onClick={() => {
            setBlockType(state.schema.nodes.heading6, {
              align: 'right'
            })(state, dispatch)
          }}
        >
          <AlignRightIcon style={{ width: '24px', height: '24px' }} />
        </Button>
      </>
    )
  }

  onClick(state, dispatch) {
    setBlockType(state.schema.nodes.heading6)(state, dispatch)
  }
}