import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faHeading, faAlignLeft, faAlignCenter, faAlignRight } from '@fortawesome/fontawesome-free-solid';
import { setBlockType } from 'prosemirror-commands';
import { blockActive } from '../utils';
import Button from '../components/button';
import uuid from 'uuid';
var Heading2 = /** @class */ (function () {
    function Heading2() {
    }
    Object.defineProperty(Heading2.prototype, "name", {
        get: function () {
            return 'heading2';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Heading2.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Heading2.prototype, "schema", {
        get: function () {
            return {
                content: "inline*",
                group: "block",
                defining: true,
                parseDOM: [
                    { tag: "h2", getAttrs: function (dom) {
                            return {
                                id: dom.getAttribute('id') || uuid()
                            };
                        } },
                ],
                attrs: {
                    align: { default: 'left' },
                    id: { default: '' }
                },
                toDOM: function (node) {
                    return ["h2", {
                            style: "text-align: " + node.attrs.align,
                            id: node.attrs.id || uuid()
                        }, 0];
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Heading2.prototype, "icon", {
        get: function () {
            return React.createElement(FontAwesomeIcon, { icon: faHeading });
        },
        enumerable: true,
        configurable: true
    });
    Heading2.prototype.active = function (state) {
        return blockActive(state.schema.nodes.heading2)(state);
    };
    Heading2.prototype.enable = function (state) {
        return setBlockType(state.schema.nodes.heading2)(state);
    };
    Heading2.prototype.customMenu = function (_a) {
        var state = _a.state, dispatch = _a.dispatch;
        return (React.createElement(React.Fragment, null,
            React.createElement(Button, { onClick: function () {
                    setBlockType(state.schema.nodes.heading2, {
                        align: 'left'
                    })(state, dispatch);
                } },
                React.createElement(FontAwesomeIcon, { icon: faAlignLeft })),
            React.createElement(Button, { onClick: function () {
                    setBlockType(state.schema.nodes.heading2, {
                        align: 'center'
                    })(state, dispatch);
                } },
                React.createElement(FontAwesomeIcon, { icon: faAlignCenter })),
            React.createElement(Button, { onClick: function () {
                    setBlockType(state.schema.nodes.heading2, {
                        align: 'right'
                    })(state, dispatch);
                } },
                React.createElement(FontAwesomeIcon, { icon: faAlignRight }))));
    };
    Heading2.prototype.onClick = function (state, dispatch) {
        setBlockType(state.schema.nodes.heading2)(state, dispatch);
    };
    return Heading2;
}());
export default Heading2;
//# sourceMappingURL=heading2.js.map