import * as React from 'react'
import { setBlockType } from 'prosemirror-commands'
import uuid from 'uuid'
import AlignLeftIcon from '../components/icons/AlignLeft'
import AlignCenterIcon from '../components/icons/AlignCenter'
import AlignRightIcon from '../components/icons/AlignRight'
import { Extension, ExtensionProps } from '../types'
import { blockActive, getParentNodeFromState, getUniqId } from '../utils'
import Button from '../components/button'

export default class CustomBlock extends Extension {
  constructor(props?: ExtensionProps) {
    if (!props.customName) {
      props.customName = getUniqId();
    }
    super(props);
  }
  get name() {
    return this.customName
  }

  get group() {
    return 'block'
  }

  get showMenu() {
    return true
  }

  get schema() {
    if (this.customSchema) {
      return this.customSchema;
    }
    const { tagName, className } = this;
    let tag = tagName;
    if (className) {
      tag += `.${className.replace(/\s/g, '.')}`;
    }
    return {
      content: 'inline*',
      group: 'block',
      defining: true,
      attrs: {
        align: { default: 'left' },
        id: { default: '' }
      },
      parseDOM: [
        {
          tag,
          getAttrs(dom) {
            return {
              id: dom.getAttribute('id') || uuid()
            }
          }
        }
      ],
      toDOM(node) {
        return [
          tagName,
          {
            style: `text-align: ${node.attrs.align}`,
            id: node.attrs.id || uuid(),
            class: className
          },
          0
        ]
      }
    }
  }

  get icon() {
    return this.customIcon
  }

  active(state) {
    return blockActive(state.schema.nodes[this.name])(state)
  }

  enable(state) {
    return setBlockType(state.schema.nodes[this.name])(state)
  }

  customMenu({ state, dispatch }) {
    const node = getParentNodeFromState(state);
    return (
      <>
        <Button
          type="button"
          active={node && node.attrs.align === 'left'}
          onClick={() => {
            setBlockType(state.schema.nodes[this.name], {
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
            setBlockType(state.schema.nodes[this.name], {
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
            setBlockType(state.schema.nodes[this.name], {
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
    setBlockType(state.schema.nodes[this.name])(state, dispatch)
  }
}
