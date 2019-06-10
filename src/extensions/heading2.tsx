import * as React from 'react'
import { setBlockType } from 'prosemirror-commands'
import uuid from 'uuid'
import HeadingIcon from '../components/icons/Heading1'
import AlignLeftIcon from '../components/icons/AlignLeft'
import AlignCenterIcon from '../components/icons/AlignCenter'
import AlignRightIcon from '../components/icons/AlignRight'
import { Extension } from '../types'
import { blockActive } from '../utils'
import Button from '../components/button'

export default class Heading2 implements Extension {
  get name() {
    return 'heading2'
  }

  get group() {
    return 'block'
  }

  get showMenu() {
    return true
  }

  get schema() {
    return {
      content: 'inline*',
      group: 'block',
      defining: true,
      parseDOM: [
        {
          tag: 'h2',
          getAttrs(dom) {
            return {
              id: dom.getAttribute('id') || uuid()
            }
          }
        }
      ],
      attrs: {
        align: { default: 'left' },
        id: { default: '' }
      },
      toDOM(node) {
        return [
          'h2',
          {
            style: `text-align: ${node.attrs.align}`,
            id: node.attrs.id || uuid()
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
    return blockActive(state.schema.nodes.heading2)(state)
  }

  enable(state) {
    return setBlockType(state.schema.nodes.heading2)(state)
  }

  customMenu({ state, dispatch }) {
    return (
      <>
        <Button
          type="button"
          onClick={() => {
            setBlockType(state.schema.nodes.heading2, {
              align: 'left'
            })(state, dispatch)
          }}
        >
          <AlignLeftIcon style={{ width: '24px', height: '24px' }} />
        </Button>
        <Button
          type="button"
          onClick={() => {
            setBlockType(state.schema.nodes.heading2, {
              align: 'center'
            })(state, dispatch)
          }}
        >
          <AlignCenterIcon style={{ width: '24px', height: '24px' }} />
        </Button>
        <Button
          type="button"
          onClick={() => {
            setBlockType(state.schema.nodes.heading2, {
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
    setBlockType(state.schema.nodes.heading2)(state, dispatch)
  }
}
