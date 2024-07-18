import * as React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { setBlockType } from 'prosemirror-commands'
import { EditorState } from 'prosemirror-state'
import { Node } from 'prosemirror-model'
import { Dispatch, Extension, ExtensionProps } from '../../types'
import { blockActive } from '../../utils'
import LinkIcon from '../../components/icons/link'
import Popup from './popup'
import Plugin from './plugin'

export default class Embed extends Extension {
  constructor(props?: ExtensionProps) {
    super(props)
  }

  // @ts-ignore
  get name() {
    return 'embed'
  }

  // @ts-ignore
  get group() {
    return 'block'
  }

  // @ts-ignore
  get showMenu() {
    return true
  }

  // @ts-ignore
  get hideInlineMenuOnFocus() {
    return true
  }

  // @ts-ignore
  get schema() {
    if (this.customSchema) {
      return this.customSchema
    }
    return {
      group: 'block',
      content: 'text*',
      selectable: true,
      isolating: true,
      attrs: {
        type: { default: 'youtube' },
        src: { default: '' }
      },
      parseDOM: [
        {
          tag: 'iframe',
          getAttrs(dom: HTMLElement) {
            return {
              src: dom.getAttribute('src')
            }
          }
        },
        {
          tag: 'div.embed-wrap',
          getAttrs(dom: HTMLElement) {
            const a = dom.querySelector('a')
            return { src: a.getAttribute('href') }
          }
        }
      ],
      toDOM: (node: Node) => {
        if (node.attrs.src.indexOf('youtube') !== -1) {
          const { src } = node.attrs
          let youtubeId = ''
          const matches = /www\.youtube\.com\/watch\?v=(.*?)$/.exec(src)
          if (matches && matches[1]) {
            youtubeId = matches[1]
          }
          if (!youtubeId) {
            const embedMatches = /www\.youtube\.com\/embed\/(.*?)$/.exec(src)
            if (embedMatches && embedMatches[1]) {
              youtubeId = embedMatches[1]
            }
          }
          if (youtubeId) {
            const url = `https://www.youtube.com/embed/${youtubeId}`
            return [
              'div',
              {
                contenteditable: true,
                class: 'youtube-frame-wrap'
              },
              [
                'div',
                {
                  class: 'youtube-frame'
                },
                [
                  'iframe',
                  {
                    src: url
                  }
                ]
              ]
            ]
          }
        }
        return [
          'div',
          {
            class: 'embed-wrap'
          },
          [
            'a',
            {
              class: 'embed',
              href: node.attrs.src
            },
            [
              'div',
              {
                class: 'embed-inner'
              },
              0
            ]
          ]
        ]
      }
    }
  }

  // @ts-ignore
  get icon() {
    return <LinkIcon style={{ width: '24px', height: '24px' }} />
  }

  active(state: EditorState) {
    return blockActive(state.schema.nodes.embed)(state)
  }

  enable(state: EditorState) {
    return setBlockType(state.schema.nodes.embed)(state)
  }

  onClick(state: EditorState, dispatch: Dispatch) {
    const div = document.createElement('div')
    document.body.appendChild(div)
    // 互換性を保つために、react-dom の render 関数及び unmountComponentAtNode を使用
    render(
      <Popup
        onClose={() => {
          unmountComponentAtNode(div)
        }}
        onDone={src => {
          const { pos } = state.selection.$anchor
          const text = state.schema.text(src)
          const node = state.schema.nodes.embed.createAndFill(
            {
              src
            },
            text
          )
          dispatch(state.tr.insert(pos, node))
          unmountComponentAtNode(div)
        }}
      />,
      div
    )
  }

  // @ts-ignore
  get plugins() {
    return [Plugin()]
  }
}
