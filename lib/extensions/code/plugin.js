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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_view_1 = require("prosemirror-view");
var prosemirror_utils_1 = require("prosemirror-utils");
var low = require("lowlight");
function getDecorations(_a) {
    var doc = _a.doc, name = _a.name;
    var decorations = [];
    var blocks = (0, prosemirror_utils_1.findBlockNodes)(doc).filter(function (item) { return item.node.type.name === name; });
    var flatten = function (list) {
        return list.reduce(function (a, b) { return a.concat(Array.isArray(b) ? flatten(b) : b); }, []);
    };
    function parseNodes(nodes, className) {
        if (className === void 0) { className = []; }
        return nodes.map(function (node) {
            var classes = __spreadArray(__spreadArray([], className, true), (node.properties ? node.properties.className : []), true);
            if (node.children) {
                return parseNodes(node.children, classes);
            }
            return {
                text: node.value,
                classes: classes
            };
        });
    }
    blocks.forEach(function (block) {
        var startPos = block.pos + 1;
        // @ts-ignore
        var items = block.node.content.content.map(function (item) {
            if (item.text) {
                return item.text;
            }
            return '\n';
        });
        var textContent = items.join('');
        var nodes = low.highlight(block.node.attrs.lang, textContent).value;
        flatten(parseNodes(nodes))
            .map(function (node) {
            var from = startPos;
            var to = from + node.text.length;
            startPos = to;
            return __assign(__assign({}, node), { from: from, to: to });
        })
            .forEach(function (node) {
            var decoration = prosemirror_view_1.Decoration.inline(node.from, node.to, {
                class: node.classes.join(' ')
            });
            decorations.push(decoration);
        });
    });
    return prosemirror_view_1.DecorationSet.create(doc, decorations);
}
function HighlightPlugin(_a) {
    var name = _a.name;
    return new prosemirror_state_1.Plugin({
        state: {
            init: function (_, _a) {
                var doc = _a.doc;
                return getDecorations({ doc: doc, name: name });
            },
            apply: function (transaction, decorationSet, oldState, state) {
                // TODO: find way to cache decorations
                // see: https://discuss.prosemirror.net/t/how-to-update-multiple-inline-decorations-on-node-change/1493
                var nodeName = state.selection.$head.parent.type.name;
                var previousNodeName = oldState.selection.$head.parent.type.name;
                if (transaction.docChanged &&
                    (nodeName === name || previousNodeName === name)) {
                    return getDecorations({ doc: transaction.doc, name: name });
                }
                return decorationSet.map(transaction.mapping, transaction.doc);
            }
        },
        props: {
            decorations: function (state) {
                return this.getState(state);
            }
        }
    });
}
exports.default = HighlightPlugin;
//# sourceMappingURL=plugin.js.map