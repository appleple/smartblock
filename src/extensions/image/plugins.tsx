import { Decoration, DecorationSet } from 'prosemirror-view';
import { findChildren } from 'prosemirror-utils';
import { Plugin } from 'prosemirror-state';

export const MediaPlugin = () => {
  return new Plugin({
    props: {
      decorations(state) {
        const doc = state.doc
        const images = findChildren(doc, (node) => {
          if (node.type.name === 'image') {
            return true;
          }
          return false;
        }, true);
        const decorations = [];
        images.forEach((image) => {
          if (!image.node.content || !image.node.content.size) {
            if (image.node.attrs.src) {
              decorations.push(Decoration.node(image.pos, image.pos + image.node.nodeSize, {
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
    filterTransaction: () => {
      return true;
    }
  })
}