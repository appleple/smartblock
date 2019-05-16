import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/fontawesome-free-solid';
import { toggleMark } from 'prosemirror-commands';
import { markActive } from '../utils';
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
            return React.createElement(FontAwesomeIcon, { icon: faLink });
        },
        enumerable: true,
        configurable: true
    });
    Link.prototype.active = function (state) {
        return markActive(state.schema.marks.link)(state);
    };
    Link.prototype.onClick = function (state, dispatch) {
        if (markActive(state.schema.marks.link)(state)) {
            toggleMark(state.schema.marks.link)(state, dispatch);
            return true;
        }
        var href = promptForURL();
        if (!href) {
            return false;
        }
        toggleMark(state.schema.marks.link, { href: href })(state, dispatch);
        toggleMark(state.schema.marks.strong)(state, dispatch);
    };
    return Link;
}());
export default Link;
//# sourceMappingURL=link.js.map