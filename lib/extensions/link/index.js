"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var prosemirror_commands_1 = require("prosemirror-commands");
var link_1 = require("../../components/icons/link");
var types_1 = require("../../types");
var utils_1 = require("../../utils");
var tooltip_1 = require("./tooltip");
var Link = /** @class */ (function (_super) {
    __extends(Link, _super);
    function Link(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(Link.prototype, "name", {
        // @ts-ignore
        get: function () {
            return 'link';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Link.prototype, "group", {
        // @ts-ignore
        get: function () {
            return 'mark';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Link.prototype, "showMenu", {
        // @ts-ignore
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Link.prototype, "schema", {
        // @ts-ignore
        get: function () {
            if (this.customSchema) {
                return this.customSchema;
            }
            var className = this.className;
            return {
                group: 'mark',
                attrs: {
                    href: {},
                    editing: { default: true },
                    title: { default: null }
                },
                inclusive: false,
                parseDOM: [
                    {
                        tag: 'a[href]:not(.embed)',
                        getAttrs: function (dom) {
                            return {
                                href: dom.getAttribute('href'),
                                title: dom.getAttribute('title')
                            };
                        }
                    }
                ],
                toDOM: function (node) {
                    var _a = node.attrs, href = _a.href, title = _a.title;
                    return ['a', { href: href, title: title, class: className }, 0];
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Link.prototype, "icon", {
        // @ts-ignore
        get: function () {
            return React.createElement(link_1.default, { style: { width: '24px', height: '24px' } });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Link.prototype, "plugins", {
        // @ts-ignore
        get: function () {
            return [(0, tooltip_1.default)()];
        },
        enumerable: false,
        configurable: true
    });
    Link.prototype.active = function (state) {
        return (0, utils_1.markActive)(state.schema.marks.link)(state);
    };
    Link.prototype.onClick = function (state, dispatch) {
        var _a;
        if ((0, utils_1.markActive)(state.schema.marks.link)(state)) {
            var link = (0, utils_1.getMarkInSelection)('link', state);
            var selection = state.selection;
            var $anchor = selection.$anchor;
            var nodeBefore = $anchor.nodeBefore, nodeAfter = $anchor.nodeAfter, pos = $anchor.pos;
            var beforePos = selection.from;
            var afterPos = selection.to;
            if (beforePos === afterPos && nodeBefore && nodeAfter) {
                beforePos = pos - nodeBefore.nodeSize;
                afterPos = pos + nodeAfter.nodeSize;
            }
            var tr = state.tr;
            tr.removeMark(beforePos, afterPos, state.schema.marks.link);
            tr.addMark(beforePos, afterPos, state.schema.marks.link.create({ href: (_a = link === null || link === void 0 ? void 0 : link.attrs) === null || _a === void 0 ? void 0 : _a.href, editing: true }));
            // dispatch
            dispatch(tr.scrollIntoView());
            return;
        }
        (0, prosemirror_commands_1.toggleMark)(state.schema.marks.link, { href: '', editing: true })(state, dispatch);
    };
    return Link;
}(types_1.Extension));
exports.default = Link;
//# sourceMappingURL=index.js.map