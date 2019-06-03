import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faAlignLeft, faAlignCenter, faAlignRight } from '@fortawesome/fontawesome-free-solid';
import { setBlockType } from 'prosemirror-commands';
import { blockActive } from '../utils';
import Button from '../components/button';
import uuid from 'uuid';
var Heading3 = /** @class */ (function () {
    function Heading3() {
    }
    Object.defineProperty(Heading3.prototype, "name", {
        get: function () {
            return 'heading3';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Heading3.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Heading3.prototype, "schema", {
        get: function () {
            return {
                content: "inline*",
                group: "block",
                defining: true,
                attrs: {
                    align: { default: 'left' },
                    id: { default: '' }
                },
                parseDOM: [
                    { tag: "h3", getAttrs: function (dom) {
                            return {
                                id: dom.getAttribute('id') || uuid()
                            };
                        } },
                ],
                toDOM: function (node) {
                    return ["h3", {
                            style: "text-align: " + node.attrs.align,
                            id: node.attrs.id || uuid()
                        }, 0];
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Heading3.prototype, "icon", {
        get: function () {
            return 'H2';
        },
        enumerable: true,
        configurable: true
    });
    Heading3.prototype.active = function (state) {
        return blockActive(state.schema.nodes.heading3)(state);
    };
    Heading3.prototype.enable = function (state) {
        return setBlockType(state.schema.nodes.heading3)(state);
    };
    Heading3.prototype.customMenu = function (_a) {
        var state = _a.state, dispatch = _a.dispatch;
        return (React.createElement(React.Fragment, null,
            React.createElement(Button, { type: "button", onClick: function () {
                    setBlockType(state.schema.nodes.heading3, {
                        align: 'left'
                    })(state, dispatch);
                } },
                React.createElement(FontAwesomeIcon, { icon: faAlignLeft })),
            React.createElement(Button, { type: "button", onClick: function () {
                    setBlockType(state.schema.nodes.heading3, {
                        align: 'center'
                    })(state, dispatch);
                } },
                React.createElement(FontAwesomeIcon, { icon: faAlignCenter })),
            React.createElement(Button, { type: "button", onClick: function () {
                    setBlockType(state.schema.nodes.heading3, {
                        align: 'right'
                    })(state, dispatch);
                } },
                React.createElement(FontAwesomeIcon, { icon: faAlignRight }))));
    };
    Heading3.prototype.onClick = function (state, dispatch) {
        setBlockType(state.schema.nodes.heading3)(state, dispatch);
    };
    return Heading3;
}());
export default Heading3;
//# sourceMappingURL=heading3.js.map