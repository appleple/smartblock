import { history } from 'prosemirror-history';
import { gapCursor } from 'prosemirror-gapcursor';
import { Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
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
                        decorations.push(Decoration.node(position, position + node.nodeSize, {
                            class: 'selected'
                        }));
                    }
                });
                return DecorationSet.create(state.doc, decorations);
            }
        }
    });
};
var placeholderPlugin = function () {
    return new Plugin({
        props: {
            decorations: function (state) {
                var decorations = [];
                var doc = state.doc;
                var decorate = function (node, pos) {
                    if (doc.childCount == 1 &&
                        doc.firstChild.isTextblock &&
                        doc.firstChild.content.size == 0) {
                        decorations.push(Decoration.node(pos, pos + node.nodeSize, {
                            class: 'empty-node',
                        }));
                    }
                };
                state.doc.descendants(decorate);
                return DecorationSet.create(state.doc, decorations);
            },
        },
    });
};
var DefaultPlugins = /** @class */ (function () {
    function DefaultPlugins(config) {
        this.placeholder = config.placeholder;
    }
    Object.defineProperty(DefaultPlugins.prototype, "name", {
        get: function () {
            return 'default-plugins';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefaultPlugins.prototype, "showMenu", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefaultPlugins.prototype, "plugins", {
        get: function () {
            return [
                currentElementPlugin(),
                placeholderPlugin(),
                // dropCursor(),
                gapCursor(),
                history()
            ];
        },
        enumerable: true,
        configurable: true
    });
    return DefaultPlugins;
}());
export default DefaultPlugins;
//# sourceMappingURL=default-plugins.js.map