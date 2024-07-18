import * as React from 'react';
import { setBlockType } from 'prosemirror-commands';
import { v4 as uuid } from 'uuid';
import { getParentNodeFromState, blockActive } from '../../utils';
import { Dispatch, Extension, ExtensionProps } from '../../types';
import Plugin from './plugin';
import Button from '../../components/button';
import CodeIcon from '../../components/icons/code';
import { Node } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';

type Lang = {
  label: React.ReactNode;
  lang: string;
};

export default class Code extends Extension {
  defaultLang = 'js';
  langs: Lang[] = [
    {
      label: '<span style="font-size: 12px;">JS</span>',
      lang: 'js',
    },
    {
      label: '<span style="font-size: 12px;">PHP</span>',
      lang: 'php',
    },
    {
      label: '<span style="font-size: 12px;">XML</span>',
      lang: 'xml',
    },
    {
      label: '<span style="font-size: 12px;">CSS</span>',
      lang: 'css',
    },
  ];

  constructor(props?: ExtensionProps) {
    super(props);
    if (props) {
      this.langs = props.langs;
    }
  }

  // @ts-ignore
  get name() {
    return 'code';
  }

  // @ts-ignore
  get group() {
    return 'block';
  }

  // @ts-ignore
  get showMenu() {
    return true;
  }

  // @ts-ignore
  get hideInlineMenuOnFocus() {
    return true;
  }

  // @ts-ignore
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
          getAttrs(dom: HTMLElement) {
            dom.innerHTML = dom.innerHTML.replace(/\n/g, '<br/>');
            return {
              id: dom.getAttribute('id') || uuid(),
              lang: dom.getAttribute('class') ? dom.getAttribute('class') : defaultLang,
            };
          },
        },
      ],
      toDOM: (node: Node) => {
        return [
          'pre',
          {
            id: node.attrs.id || uuid(),
            className: this.className,
          },
          [
            'code',
            {
              class: node.attrs.lang,
            },
            0,
          ],
        ];
      },
      attrs: {
        id: {
          default: '',
        },
        lang: {
          default: defaultLang,
        },
      },
    };
  }

  // @ts-ignore
  get icon() {
    return <CodeIcon style={{ width: '24px', height: '24px' }} />;
  }

  active(state: EditorState) {
    return blockActive(state.schema.nodes.code)(state);
  }

  enable(state: EditorState) {
    return setBlockType(state.schema.nodes.code)(state);
  }

  onClick(state: EditorState, dispatch: Dispatch) {
    setBlockType(state.schema.nodes.code)(state, dispatch);
  }

  customMenu({ state, dispatch }: { state: EditorState; dispatch: Dispatch }) {
    const node = getParentNodeFromState(state);
    const { langs } = this;
    return (
      <>
        {langs.map((lang) => (
          <Button
            key={lang.lang}
            active={node && node.attrs.lang === lang.lang}
            type="button"
            onClick={() => {
              setBlockType(state.schema.nodes.code, {
                lang: lang.lang,
              })(state, dispatch);
            }}
          >
            {typeof lang.label !== 'string' ? lang.label : <span dangerouslySetInnerHTML={{ __html: lang.label }} />}
          </Button>
        ))}
      </>
    );
  }

  // @ts-ignore
  get plugins() {
    return [
      Plugin({
        name: 'code',
      }),
    ];
  }
}
