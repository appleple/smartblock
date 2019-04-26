import { history } from 'prosemirror-history'
import { dropCursor } from 'prosemirror-dropcursor'
import { gapCursor } from 'prosemirror-gapcursor'
import { columnResizing, tableEditing } from 'prosemirror-tables'
import { placeholder } from '@aeaton/prosemirror-placeholder'
import { footnotes } from '@aeaton/prosemirror-footnotes'
import { Plugin } from "prosemirror-state"
import { Decoration, DecorationSet } from "prosemirror-view"

import 'prosemirror-tables/style/tables.css'
import 'prosemirror-gapcursor/style/gapcursor.css'
import '@aeaton/prosemirror-footnotes/style/footnotes.css'
import '@aeaton/prosemirror-placeholder/style/placeholder.css'

import keys from './keys'
import rules from './rules'

const currentElementPlugin = () => {
  return new Plugin({
    props: {
      decorations(state) {
        const selection = state.selection;
        const decorations = [];

        state.doc.nodesBetween(selection.from, selection.to, (node, position) => {
          if (node.isBlock) {
            decorations.push(Decoration.node(position, position + node.nodeSize, {class: 'selected'}));
          }
        });

        return DecorationSet.create(state.doc, decorations);
      }
    }
  });
};

export default [
  rules,
  keys,
  currentElementPlugin(),
  placeholder(),
  footnotes(),
  dropCursor(),
  gapCursor(),
  history(),
  columnResizing(),
  tableEditing()
]

// for tables
document.execCommand('enableObjectResizing', false, 'false')
document.execCommand('enableInlineTableEditing', false, 'false')
