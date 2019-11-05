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
import * as React from 'react';
import { setBlockType } from 'prosemirror-commands';
import uuid from 'uuid';
import HeadingIcon from '../components/icons/Heading5';
import AlignLeftIcon from '../components/icons/AlignLeft';
import AlignCenterIcon from '../components/icons/AlignCenter';
import AlignRightIcon from '../components/icons/AlignRight';
import { Extension } from '../types';
import { blockActive, getParentNodeFromState } from '../utils';
import Button from '../components/button';
var Heading5 = /** @class */ (function (_super) {
    __extends(Heading5, _super);
    function Heading5(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(Heading5.prototype, "name", {
        get: function () {
            return 'heading5';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Heading5.prototype, "group", {
        get: function () {
            return 'block';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Heading5.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Heading5.prototype, "schema", {
        get: function () {
            if (this.customSchema) {
                return this.customSchema;
            }
            return {
                content: 'inline*',
                group: 'block',
                defining: true,
                parseDOM: [
                    {
                        tag: 'h5',
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
                        'h5',
                        {
                            style: "text-align: " + node.attrs.align,
                            id: node.attrs.id || uuid(),
                            class: this.className
                        },
                        0
                    ];
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Heading5.prototype, "icon", {
        get: function () {
            return React.createElement(HeadingIcon, { style: { width: '24px', height: '24px' } });
        },
        enumerable: true,
        configurable: true
    });
    Heading5.prototype.active = function (state) {
        return blockActive(state.schema.nodes.heading5)(state);
    };
    Heading5.prototype.enable = function (state) {
        return setBlockType(state.schema.nodes.heading5)(state);
    };
    Heading5.prototype.customMenu = function (_a) {
        var state = _a.state, dispatch = _a.dispatch;
        var node = getParentNodeFromState(state);
        return (React.createElement(React.Fragment, null,
            React.createElement(Button, { active: node && node.attrs.align === 'left', type: "button", onClick: function () {
                    setBlockType(state.schema.nodes.heading5, {
                        align: 'left'
                    })(state, dispatch);
                } },
                React.createElement(AlignLeftIcon, { style: { width: '24px', height: '24px' } })),
            React.createElement(Button, { type: "button", active: node && node.attrs.align === 'center', onClick: function () {
                    setBlockType(state.schema.nodes.heading5, {
                        align: 'center'
                    })(state, dispatch);
                } },
                React.createElement(AlignCenterIcon, { style: { width: '24px', height: '24px' } })),
            React.createElement(Button, { type: "button", active: node && node.attrs.align === 'right', onClick: function () {
                    setBlockType(state.schema.nodes.heading5, {
                        align: 'right'
                    })(state, dispatch);
                } },
                React.createElement(AlignRightIcon, { style: { width: '24px', height: '24px' } }))));
    };
    Heading5.prototype.onClick = function (state, dispatch) {
        setBlockType(state.schema.nodes.heading5)(state, dispatch);
    };
    return Heading5;
}(Extension));
export default Heading5;
//# sourceMappingURL=heading5.js.map