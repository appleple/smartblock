import { Decoration, DecorationSet } from 'prosemirror-view';
import { findChildren } from 'prosemirror-utils';
import { Plugin } from 'prosemirror-state';

export const MediaPlugin = (text: string) => {
  return new Plugin({
    props: {
      decorations(state) {
        let doc = state.doc
        const medias = findChildren(doc, (node) => {
          if (node.type.name === 'media') {
            return true;
          }
          return false;
        }, true);
        const decorations = [];
        medias.forEach((media) => {
          if (!media.node.content || !media.node.content.size) {
            if (media.node.attrs.media_id) {
              decorations.push(Decoration.node(media.pos, media.pos + media.node.nodeSize, {
                class: 'empty-node',
              }));
            }
          }
        });
        if (decorations.length) {
          return DecorationSet.create(doc, decorations);
        }
      }
    },
    filterTransaction: (tr, state) => {
      return true;
    }
  })
}