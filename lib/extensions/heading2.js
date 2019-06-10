import * as React from 'react';
import { setBlockType } from 'prosemirror-commands';
import uuid from 'uuid';
import HeadingIcon from '../components/icons/Heading1';
import AlignLeftIcon from '../components/icons/AlignLeft';
import AlignCenterIcon from '../components/icons/AlignCenter';
import AlignRightIcon from '../components/icons/AlignRight';
import { blockActive } from '../utils';
import Button from '../components/button';
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
    Object.defineProperty(Heading2.prototype, "group", {
        get: function () {
            return 'block';
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
                content: 'inline*',
                group: 'block',
                defining: true,
                parseDOM: [
                    {
                        tag: 'h2',
                        getAttrs: function (dom) {
                            return {
                                id: dom.getAttribute('id') || uuid()
                            };
                        }
                    }
                ],
                attrs: {
                    align: { default: 'left' },
                    id: { default: '' }
                },
                toDOM: function (node) {
                    return [
                        'h2',
                        {
                            style: "text-align: " + node.attrs.align,
                            id: node.attrs.id || uuid()
                        },
                        0
                    ];
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Heading2.prototype, "icon", {
        get: function () {
            return React.createElement(HeadingIcon, { style: { width: '24px', height: '24px' } });
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
            React.createElement(Button, { type: "button", onClick: function () {
                    setBlockType(state.schema.nodes.heading2, {
                        align: 'left'
                    })(state, dispatch);
                } },
                React.createElement(AlignLeftIcon, { style: { width: '24px', height: '24px' } })),
            React.createElement(Button, { type: "button", onClick: function () {
                    setBlockType(state.schema.nodes.heading2, {
                        align: 'center'
                    })(state, dispatch);
                } },
                React.createElement(AlignCenterIcon, { style: { width: '24px', height: '24px' } })),
            React.createElement(Button, { type: "button", onClick: function () {
                    setBlockType(state.schema.nodes.heading2, {
                        align: 'right'
                    })(state, dispatch);
                } },
                React.createElement(AlignRightIcon, { style: { width: '24px', height: '24px' } }))));
    };
    Heading2.prototype.onClick = function (state, dispatch) {
        setBlockType(state.schema.nodes.heading2)(state, dispatch);
    };
    return Heading2;
}());
export default Heading2;
//# sourceMappingURL=heading2.js.map