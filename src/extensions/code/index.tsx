import * as React from 'react';
import { setBlockType } from 'prosemirror-commands';
import * as uuid from 'uuid/v4'
import { getParentNodeFromState } from '../../utils';
import { Extension, ExtensionProps } from '../../types';
import { blockActive } from '../../utils';
import Plugin from './plugin';
import Button from '../../components/button';
import CodeIcon from '../../components/icons/code';

type Lang = {
  label: React.ReactNode;
  lang: string;
}

export default class Code extends Extension {
  defaultLang = 'js'
  langs: Lang[] = [
    {
      label: '<span style="font-size: 12px;">JS</span>',
      lang: 'js'
    },
    {
      label: '<span style="font-size: 12px;">PHP</span>',
      lang: 'php'
    },
    {
      label: '<span style="font-size: 12px;">XML</span>',
      lang: 'xml'
    },
    {
      label: '<span style="font-size: 12px;">CSS</span>',
      lang: 'css'
    }
  ]

  constructor(props?: ExtensionProps) {
    super(props);
    if (props) {
      this.langs = props.langs
    }
  }

  get name() {
    return 'code';
  }

  get group() {
    return 'block';
  }

  get showMenu() {
    return true;
  }

  get hideInlineMenuOnFocus() {
    return true;
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
            dom.innerHTML = dom.innerHTML.replace(/\n/g, '<br/>');
            return {
              id: dom.getAttribute('id') || uuid(),
              lang: dom.getAttribute('class') ? dom.getAttribute('class') : defaultLang
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
          ['code', {
            class: node.attrs.lang
          }, 0]
        ]
      },
      attrs: {
        id: {
          default: ''
        },
        lang: {
          default: defaultLang
        }
      }
    }
  }

  get icon() {
    return <CodeIcon style={{ width: '24px', height: '24px' }} />
  }

  active(state) {
    return blockActive(state.schema.nodes.code)(state);
  }

  enable(state) {
    return setBlockType(state.schema.nodes.code)(state);
  }

  onClick(state, dispatch) {
    setBlockType(state.schema.nodes.code)(state, dispatch);
  }

  customMenu({ state, dispatch }) {
    const node = getParentNodeFromState(state);
    const { langs } = this;
    return (
      <>
        {langs.map(lang => (
          <Button
            active={node && node.attrs.lang === lang.lang}
            type="button"
            onClick={() => {
              setBlockType(state.schema.nodes.code, {
                lang: lang.lang
              })(state, dispatch)
            }}
          >
            {typeof lang.label !== 'string' ? (
              lang.label
            ) : (
              <span dangerouslySetInnerHTML={{ __html: lang.label }} />
            )}
          </Button>))}
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
