import * as React from 'react'
import { getParentNodeFromState } from '../../utils';
import { setBlockType } from 'prosemirror-commands'
import uuid from 'uuid'
import { Extension, ExtensionProps } from '../../types'
import { blockActive } from '../../utils';
import Plugin from './plugin';
import Button from '../../components/button';


type Lang = {
  label: React.ReactNode;
  lang: string;
}

export default class Code extends Extension {


  defaultLang = 'js';
  langs: Lang[] = [
    {
      label: 'JS',
      lang: 'js'
    },
    {
      label: 'PHP',
      lang: 'php'
    },
    {
      label: 'HTML',
      lang: 'html'
    },
    {
      label: 'CSS',
      lang: 'css'
    }
  ];

  constructor(props?: ExtensionProps) {
    super(props);
    if (props) {
      this.langs = props.langs;
    }
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
    const { defaultLang } = this;
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
          default: defaultLang
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
    const { langs } = this;
    return (
      <>
        {langs.map((lang) =><Button
          active={node && node.attrs.lang === lang.lang}
          type="button"
          onClick={() => {
            setBlockType(state.schema.nodes.code, {
              lang: lang.lang
            })(state, dispatch)
          }}
        >
          {lang.label}
        </Button>)}
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