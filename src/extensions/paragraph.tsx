import * as React from 'react'
import { setBlockType } from 'prosemirror-commands'
import uuid from 'uuid'
import ParagraphIcon from '../components/icons/Paragraph'
import AlignLeftIcon from '../components/icons/AlignLeft'
import AlignCenterIcon from '../components/icons/AlignCenter'
import AlignRightIcon from '../components/icons/AlignRight'
import { Extension, ExtensionProps } from '../types'
import { blockActive, getParentNodeFromState } from '../utils'
import Button from '../components/button'

export default class Paragraph extends Extension {
  constructor(props?: ExtensionProps) {
    super(props)
  }

  get name() {
    return 'paragraph'
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
      parseDOM: [
        {
          tag: 'p',
          getAttrs(dom) {
            const attr = {
              id: dom.getAttribute('id') || uuid()
            };
            if (dom.style.textAlign) {
              attr['align'] = dom.style.textAlign;
            }
            return attr;
          }
        }
      ],
      attrs: {
        align: { default: 'left' },
        id: { default: '' }
      },
      toDOM: node => {
        return [
          'p',
          {
            style: `text-align: ${node.attrs.align}`,
            id: node.attrs.id || uuid(),
            class: this.className
          },
          0
        ]
      }
    }
  }

  get icon() {
    return <ParagraphIcon style={{ width: '24px', height: '24px' }} />
  }

  active(state) {
    return blockActive(state.schema.nodes.paragraph)(state)
  }

  enable(state) {
    return setBlockType(state.schema.nodes.paragraph)(state)
  }

  customMenu({ state, dispatch }) {
    const node = getParentNodeFromState(state)
    return (
      <>
        <Button
          type="button"
          active={node && node.attrs.align === 'left'}
          onClick={() => {
            setBlockType(state.schema.nodes.paragraph, {
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
            setBlockType(state.schema.nodes.paragraph, {
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
            setBlockType(state.schema.nodes.paragraph, {
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
    setBlockType(state.schema.nodes.paragraph)(state, dispatch)
  }
}
