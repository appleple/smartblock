"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var prosemirror_commands_1 = require("prosemirror-commands");
var Link_1 = require("../../components/icons/Link");
var types_1 = require("../../types");
var utils_1 = require("../../utils");
var tooltip_1 = require("./tooltip");
var Link = /** @class */ (function (_super) {
    __extends(Link, _super);
    function Link(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(Link.prototype, "name", {
        get: function () {
            return 'link';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Link.prototype, "group", {
        get: function () {
            return 'mark';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Link.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Link.prototype, "schema", {
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
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Link.prototype, "icon", {
        get: function () {
            return React.createElement(Link_1.default, { style: { width: '24px', height: '24px' } });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Link.prototype, "plugins", {
        get: function () {
            return [tooltip_1.default()];
        },
        enumerable: true,
        configurable: true
    });
    Link.prototype.active = function (state) {
        return utils_1.markActive(state.schema.marks.link)(state);
    };
    Link.prototype.onClick = function (state, dispatch) {
        if (utils_1.markActive(state.schema.marks.link)(state)) {
            var link = utils_1.getMarkInSelection('link', state);
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
            tr.addMark(beforePos, afterPos, state.schema.marks.link.create({ href: link.attrs.href, editing: true }));
            // dispatch
            dispatch(tr.scrollIntoView());
            return true;
        }
        prosemirror_commands_1.toggleMark(state.schema.marks.link, { href: '', editing: true })(state, dispatch);
    };
    return Link;
}(types_1.Extension));
exports.default = Link;
//# sourceMappingURL=index.js.map