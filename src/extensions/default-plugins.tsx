import { history } from 'prosemirror-history';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import { Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { Extension } from '../types';

import 'prosemirror-tables/style/tables.css';
import 'prosemirror-gapcursor/style/gapcursor.css';
import '@aeaton/prosemirror-footnotes/style/footnotes.css';
import '@aeaton/prosemirror-placeholder/style/placeholder.css';

const currentElementPlugin = () => {
  return new Plugin({
    props: {
      decorations(state) {
        const { selection } = state;
        const decorations = [];
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
        return DecorationSet.create(state.doc, decorations);
      }
    }
  })
}

const placeholderPlugin = () => {
  return new Plugin({
    props: {
      decorations: state => {
        const decorations = [];
        const { doc } = state;
        const decorate = (node, pos) => {
        if (
          doc.childCount == 1 &&
          doc.firstChild.isTextblock &&
          doc.firstChild.content.size == 0
        ) {
            decorations.push(
              Decoration.node(pos, pos + node.nodeSize, {
                class: 'empty-node',
              })
            )
          }
        }
        state.doc.descendants(decorate);
        return DecorationSet.create(state.doc, decorations);
      },
    },
  })
}

type Config = {
  placeholder: string;
}

export default class DefaultPlugins implements Extension {
  placeholder: string;

  constructor(config: Config) {
    this.placeholder = config.placeholder;
  }

  get name() {
    return 'default-plugins'
  }

  get showMenu() {
    return false;
  }

  get plugins() {
    return [
      currentElementPlugin(),
      placeholderPlugin(),
      // dropCursor(),
      gapCursor(),
      history()
    ]
  }
}
