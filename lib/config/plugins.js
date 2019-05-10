"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_history_1 = require("prosemirror-history");
var prosemirror_dropcursor_1 = require("prosemirror-dropcursor");
var prosemirror_gapcursor_1 = require("prosemirror-gapcursor");
var prosemirror_placeholder_1 = require("@aeaton/prosemirror-placeholder");
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_view_1 = require("prosemirror-view");
require("prosemirror-tables/style/tables.css");
require("prosemirror-gapcursor/style/gapcursor.css");
require("@aeaton/prosemirror-footnotes/style/footnotes.css");
require("@aeaton/prosemirror-placeholder/style/placeholder.css");
var currentElementPlugin = function () {
    return new prosemirror_state_1.Plugin({
        props: {
            decorations: function (state) {
                var selection = state.selection;
                var decorations = [];
                state.doc.nodesBetween(selection.from, selection.to, function (node, position) {
                    if (node.isBlock) {
                        decorations.push(prosemirror_view_1.Decoration.node(position, position + node.nodeSize, { class: 'selected' }));
                    }
                });
                return prosemirror_view_1.DecorationSet.create(state.doc, decorations);
            }
        }
    });
};
exports.default = [
    currentElementPlugin(),
    prosemirror_placeholder_1.placeholder(),
    prosemirror_dropcursor_1.dropCursor(),
    prosemirror_gapcursor_1.gapCursor(),
    prosemirror_history_1.history(),
];
//# sourceMappingURL=plugins.js.map