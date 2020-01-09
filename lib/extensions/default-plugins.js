"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_history_1 = require("prosemirror-history");
var prosemirror_gapcursor_1 = require("prosemirror-gapcursor");
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_view_1 = require("prosemirror-view");
require("prosemirror-tables/style/tables.css");
require("prosemirror-gapcursor/style/gapcursor.css");
var currentElementPlugin = function () {
    return new prosemirror_state_1.Plugin({
        props: {
            decorations: function (state) {
                var selection = state.selection;
                var decorations = [];
                state.doc.nodesBetween(selection.from, selection.to, function (node, position) {
                    if (node.isBlock) {
                        decorations.push(prosemirror_view_1.Decoration.node(position, position + node.nodeSize, {
                            class: 'selected'
                        }));
                    }
                });
                return prosemirror_view_1.DecorationSet.create(state.doc, decorations);
            }
        }
    });
};
var placeholderPlugin = function () {
    return new prosemirror_state_1.Plugin({
        props: {
            decorations: function (state) {
                var decorations = [];
                var doc = state.doc;
                var decorate = function (node, pos) {
                    if (doc.childCount == 1 &&
                        doc.firstChild.isTextblock &&
                        doc.firstChild.content.size == 0) {
                        decorations.push(prosemirror_view_1.Decoration.node(pos, pos + node.nodeSize, {
                            class: 'empty-node',
                        }));
                    }
                };
                state.doc.descendants(decorate);
                return prosemirror_view_1.DecorationSet.create(state.doc, decorations);
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
                prosemirror_gapcursor_1.gapCursor(),
                prosemirror_history_1.history()
            ];
        },
        enumerable: true,
        configurable: true
    });
    return DefaultPlugins;
}());
exports.default = DefaultPlugins;
//# sourceMappingURL=default-plugins.js.map