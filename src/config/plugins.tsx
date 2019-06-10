import { history } from 'prosemirror-history'
import { dropCursor } from 'prosemirror-dropcursor'
import { gapCursor } from 'prosemirror-gapcursor'
import { Plugin } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'

import 'prosemirror-tables/style/tables.css'
import 'prosemirror-gapcursor/style/gapcursor.css'
import '@aeaton/prosemirror-footnotes/style/footnotes.css'
import '@aeaton/prosemirror-placeholder/style/placeholder.css'

const currentElementPlugin = () => {
  return new Plugin({
    props: {
      decorations(state) {
        const { selection } = state
        const decorations = []

        state.doc.nodesBetween(
          selection.from,
          selection.to,
          (node, position) => {
            if (node.isBlock) {
              decorations.push(
                Decoration.node(position, position + node.nodeSize, {
                  class: 'selected'
                })
              )
            }
          }
        )
        return DecorationSet.create(state.doc, decorations)
      }
    }
  })
}

const placeholderPlugin = (text: string) => {
  return new Plugin({
    props: {
      decorations(state) {
        let doc = state.doc
        if (doc.childCount == 1 && doc.firstChild.isTextblock && doc.firstChild.content.size == 0) {
          return DecorationSet.create(doc, [Decoration.widget(1, document.createTextNode(text))])
        }
      }
    }
  })
}

export default [
  currentElementPlugin(),
  placeholderPlugin('本文を入力しましょう'),
  dropCursor(),
  gapCursor(),
  history()
]
