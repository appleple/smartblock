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
var placeholderPlugin = function (text) {
    return new Plugin({
        props: {
            decorations: function (state) {
                var doc = state.doc;
                if (doc.childCount == 1 && doc.firstChild.isTextblock && doc.firstChild.content.size == 0) {
                    return DecorationSet.create(doc, [Decoration.widget(1, document.createTextNode(text))]);
                }
            }
        }
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
                placeholderPlugin(this.placeholder),
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