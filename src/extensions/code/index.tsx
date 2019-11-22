import * as React from 'react'
import { getParentNodeFromState } from '../../utils';
import { setBlockType } from 'prosemirror-commands'
import uuid from 'uuid'
import { Extension, ExtensionProps } from '../../types'
import { blockActive } from '../../utils';
import Plugin from './plugin';
import Button from '../../components/button'

export default class Code extends Extension {

  constructor(props?: ExtensionProps) {
    super(props);
  }
  get name() {
    return 'code'
  }

  get group() {
    return 'block'
  }

  get showMenu() {
    return true
  }

  get hideInlineMenuOnFocus() {
    return true
  }

  get schema() {
    if (this.customSchema) {
      return this.customSchema;
    }
    return {
      content: 'inline*',
      group: 'block',
      parseDOM: [
        {
          tag: 'code',
          getAttrs(dom) {
            return {
              id: dom.getAttribute('id') || uuid(),
            }
          }
        }
      ],
      toDOM: node => {
        return [
          'pre',
          {
            id: node.attrs.id || uuid(),
            className: this.className
          },
          ['code', 0]
        ]
      },
      attrs: {
        id: { 
          default: '',
        },
        lang: {
          default: 'javascript'
        }
      }
    }
  }

  get icon() {
    return 'C'
  }

  active(state) {
    return blockActive(state.schema.nodes.code)(state)
  }

  enable(state) {
    return setBlockType(state.schema.nodes.code)(state)
  }

  onClick(state, dispatch) {
    setBlockType(state.schema.nodes.code)(state, dispatch)
  }

  customMenu({ state, dispatch }) {
    const node = getParentNodeFromState(state);
    return (
      <>
        <Button
          active={node && node.attrs.lang === 'js'}
          type="button"
          onClick={() => {
            setBlockType(state.schema.nodes.code, {
              lang: 'js'
            })(state, dispatch)
          }}
        >
          JS
        </Button>
        <Button
          type="button"
          active={node && node.attrs.lang === 'css'}
          onClick={() => {
            setBlockType(state.schema.nodes.code, {
              lang: 'css'
            })(state, dispatch)
          }}
        >
          CSS
        </Button>
        <Button
          type="button"
          active={node && node.attrs.lang === 'html'}
          onClick={() => {
            setBlockType(state.schema.nodes.code, {
              lang: 'html'
            })(state, dispatch)
          }}
        >
          HTML
        </Button>
        <Button
          type="button"
          active={node && node.attrs.lang === 'php'}
          onClick={() => {
            setBlockType(state.schema.nodes.code, {
              lang: 'php'
            })(state, dispatch)
          }}
        >
          PHP
        </Button>
      </>
    )
  }

  get plugins() {
    return [
      Plugin({
        name: 'code'
      })
    ]
  }
}