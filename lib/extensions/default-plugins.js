"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.placeholderPlugin = exports.currentElementPlugin = void 0;
var prosemirror_history_1 = require("prosemirror-history");
var prosemirror_gapcursor_1 = require("prosemirror-gapcursor");
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_view_1 = require("prosemirror-view");
var currentElementPlugin = function () {
    return new prosemirror_state_1.Plugin({
        props: {
            // @ts-ignore
            decorations: function (state) {
                var selection = state.selection;
                var decorations = [];
                state.doc.nodesBetween(selection.from, selection.to, function (node, position) {
                    if (node.isBlock) {
                        decorations.push(prosemirror_view_1.Decoration.node(position, position + node.nodeSize, {
                            class: 'selected',
                        }));
                    }
                });
                return prosemirror_view_1.DecorationSet.create(state.doc, decorations);
            },
        },
    });
};
exports.currentElementPlugin = currentElementPlugin;
var defaultPlaceholderOptions = {
    placeholder: 'Write something …',
    emptyNodeClass: 'empty-node',
    emptyEditorClass: 'empty-editor',
};
var placeholderPlugin = function (options) {
    if (options === void 0) { options = {}; }
    var config = __assign(__assign({}, defaultPlaceholderOptions), options);
    return new prosemirror_state_1.Plugin({
        props: {
            // @ts-ignore
            decorations: function (state) {
                var _a;
                var decorations = [];
                var doc = state.doc, selection = state.selection;
                var anchor = selection.anchor;
                // only calculate isEmpty once due to its performance impacts
                var firstChild = doc.content.firstChild;
                var isLeaf = firstChild && firstChild.type.isLeaf;
                var isAtom = firstChild && firstChild.isAtom;
                var isValidNode = firstChild && firstChild.type.name === ((_a = doc.type.contentMatch.defaultType) === null || _a === void 0 ? void 0 : _a.name);
                var isEmptyDoc = doc.content.childCount <= 1
                    && firstChild
                    && isValidNode
                    && (firstChild.nodeSize <= 2 && (!isLeaf || !isAtom));
                var decorate = function (node, pos) {
                    var hasAnchor = anchor >= pos && anchor <= pos + node.nodeSize;
                    var isEmpty = !node.isLeaf && !node.childCount;
                    if (hasAnchor && isEmpty) {
                        var classes = [config.emptyNodeClass];
                        if (isEmptyDoc) {
                            classes.push(config.emptyEditorClass);
                        }
                        decorations.push(prosemirror_view_1.Decoration.node(pos, pos + node.nodeSize, {
                            class: classes.join(' '),
                            'data-placeholder': typeof config.placeholder === 'function'
                                ? config.placeholder({
                                    node: node,
                                    pos: pos,
                                    hasAnchor: hasAnchor,
                                })
                                : config.placeholder,
                        }));
                    }
                };
                state.doc.descendants(decorate);
                return prosemirror_view_1.DecorationSet.create(state.doc, decorations);
            },
        },
    });
};
exports.placeholderPlugin = placeholderPlugin;
var defaultOptions = __assign({}, defaultPlaceholderOptions);
var DefaultPlugins = /** @class */ (function () {
    function DefaultPlugins(options) {
        if (options === void 0) { options = {}; }
        this.config = __assign(__assign({}, defaultOptions), options);
    }
    Object.defineProperty(DefaultPlugins.prototype, "name", {
        get: function () {
            return 'default-plugins';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DefaultPlugins.prototype, "showMenu", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DefaultPlugins.prototype, "plugins", {
        get: function () {
            return [
                (0, exports.currentElementPlugin)(),
                (0, exports.placeholderPlugin)({
                    placeholder: this.config.placeholder,
                    emptyNodeClass: this.config.emptyNodeClass,
                    emptyEditorClass: this.config.emptyEditorClass,
                }),
                // dropCursor(),
                (0, prosemirror_gapcursor_1.gapCursor)(),
                (0, prosemirror_history_1.history)(),
            ];
        },
        enumerable: false,
        configurable: true
    });
    return DefaultPlugins;
}());
exports.default = DefaultPlugins;
//# sourceMappingURL=default-plugins.js.map