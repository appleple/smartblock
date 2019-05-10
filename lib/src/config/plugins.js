import { history } from 'prosemirror-history';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import { placeholder } from '@aeaton/prosemirror-placeholder';
import { Plugin } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
import 'prosemirror-tables/style/tables.css';
import 'prosemirror-gapcursor/style/gapcursor.css';
import '@aeaton/prosemirror-footnotes/style/footnotes.css';
import '@aeaton/prosemirror-placeholder/style/placeholder.css';
var currentElementPlugin = function () {
    return new Plugin({
        props: {
            decorations: function (state) {
                var selection = state.selection;
                var decorations = [];
                state.doc.nodesBetween(selection.from, selection.to, function (node, position) {
                    if (node.isBlock) {
                        decorations.push(Decoration.node(position, position + node.nodeSize, { class: 'selected' }));
                    }
                });
                return DecorationSet.create(state.doc, decorations);
            }
        }
    });
};
export default [
    currentElementPlugin(),
    placeholder(),
    dropCursor(),
    gapCursor(),
    history(),
];
//# sourceMappingURL=plugins.js.map