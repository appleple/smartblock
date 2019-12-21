import { Decoration, DecorationSet } from 'prosemirror-view';
import { findChildren } from 'prosemirror-utils';
import { Plugin } from 'prosemirror-state';
export var MediaPlugin = function () {
    return new Plugin({
        props: {
            decorations: function (state) {
                var doc = state.doc;
                var images = findChildren(doc, function (node) {
                    if (node.type.name === 'image') {
                        return true;
                    }
                    return false;
                }, true);
                var decorations = [];
                images.forEach(function (image) {
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
        filterTransaction: function (tr, state) {
            return true;
        }
    });
};
//# sourceMappingURL=plugins.js.map