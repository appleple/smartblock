"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaPlugin = void 0;
var prosemirror_view_1 = require("prosemirror-view");
var prosemirror_utils_1 = require("prosemirror-utils");
var prosemirror_state_1 = require("prosemirror-state");
var MediaPlugin = function () {
    return new prosemirror_state_1.Plugin({
        props: {
            // @ts-ignore
            decorations: function (state) {
                var doc = state.doc;
                var images = (0, prosemirror_utils_1.findChildren)(doc, function (node) {
                    if (node.type.name === 'image') {
                        return true;
                    }
                    return false;
                }, true);
                var decorations = [];
                images.forEach(function (image) {
                    if (!image.node.content || !image.node.content.size) {
                        if (image.node.attrs.src) {
                            decorations.push(prosemirror_view_1.Decoration.node(image.pos, image.pos + image.node.nodeSize, {
                                class: 'empty-node',
                            }));
                        }
                    }
                });
                if (decorations.length) {
                    return prosemirror_view_1.DecorationSet.create(doc, decorations);
                }
            }
        },
        filterTransaction: function () {
            return true;
        }
    });
};
exports.MediaPlugin = MediaPlugin;
//# sourceMappingURL=plugins.js.map