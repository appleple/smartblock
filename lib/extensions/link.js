"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var fontawesome_free_solid_1 = require("@fortawesome/fontawesome-free-solid");
var prosemirror_commands_1 = require("prosemirror-commands");
var util_1 = require("../util");
var promptForURL = function () {
    var url = window && window.prompt('Enter the URL', 'https://');
    if (url && !/^https?:\/\//i.test(url)) {
        url = 'http://' + url;
    }
    return url;
};
var Link = /** @class */ (function () {
    function Link() {
    }
    Object.defineProperty(Link.prototype, "name", {
        get: function () {
            return 'link';
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
            return {
                group: 'mark',
                attrs: {
                    href: {},
                    title: { default: null }
                },
                inclusive: false,
                parseDOM: [{ tag: "a[href]", getAttrs: function (dom) {
                            return { href: dom.getAttribute("href"), title: dom.getAttribute("title") };
                        } }],
                toDOM: function (node) { var _a = node.attrs, href = _a.href, title = _a.title; return ["a", { href: href, title: title }, 0]; }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Link.prototype, "icon", {
        get: function () {
            return React.createElement(react_fontawesome_1.default, { icon: fontawesome_free_solid_1.faLink });
        },
        enumerable: true,
        configurable: true
    });
    Link.prototype.active = function (state) {
        return util_1.markActive(state.schema.marks.link)(state);
    };
    Link.prototype.onClick = function (state, dispatch) {
        if (util_1.markActive(state.schema.marks.link)(state)) {
            prosemirror_commands_1.toggleMark(state.schema.marks.link)(state, dispatch);
            return true;
        }
        var href = promptForURL();
        if (!href) {
            return false;
        }
        prosemirror_commands_1.toggleMark(state.schema.marks.link, { href: href })(state, dispatch);
        prosemirror_commands_1.toggleMark(state.schema.marks.strong)(state, dispatch);
    };
    return Link;
}());
exports.default = Link;
//# sourceMappingURL=link.js.map