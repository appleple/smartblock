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
import AlignLeftIcon from '../components/icons/AlignLeft';
import AlignCenterIcon from '../components/icons/AlignCenter';
import AlignRightIcon from '../components/icons/AlignRight';
import { Extension } from '../types';
import { blockActive, getParentNodeFromState, getUniqId } from '../utils';
import Button from '../components/button';
var CustomBlock = /** @class */ (function (_super) {
    __extends(CustomBlock, _super);
    function CustomBlock(props) {
        var _this = this;
        if (!props.customName) {
            props.customName = getUniqId();
        }
        _this = _super.call(this, props) || this;
        return _this;
    }
    Object.defineProperty(CustomBlock.prototype, "name", {
        get: function () {
            return this.customName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomBlock.prototype, "group", {
        get: function () {
            return 'block';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomBlock.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomBlock.prototype, "schema", {
        get: function () {
            if (this.customSchema) {
                return this.customSchema;
            }
            var _a = this, tagName = _a.tagName, className = _a.className;
            var tag = tagName;
            if (className) {
                tag += "." + className.replace(/\s/g, '.');
            }
            return {
                content: 'inline*',
                group: 'block',
                defining: true,
                attrs: {
                    align: { default: 'left' },
                    id: { default: '' }
                },
                parseDOM: [
                    {
                        tag: tag,
                        getAttrs: function (dom) {
                            return {
                                id: dom.getAttribute('id') || uuid()
                            };
                        }
                    }
                ],
                toDOM: function (node) {
                    return [
                        tagName,
                        {
                            style: "text-align: " + node.attrs.align,
                            id: node.attrs.id || uuid(),
                            class: className
                        },
                        0
                    ];
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomBlock.prototype, "icon", {
        get: function () {
            return this.customIcon;
        },
        enumerable: true,
        configurable: true
    });
    CustomBlock.prototype.active = function (state) {
        return blockActive(state.schema.nodes[this.name])(state);
    };
    CustomBlock.prototype.enable = function (state) {
        return setBlockType(state.schema.nodes[this.name])(state);
    };
    CustomBlock.prototype.customMenu = function (_a) {
        var _this = this;
        var state = _a.state, dispatch = _a.dispatch;
        var node = getParentNodeFromState(state);
        return (React.createElement(React.Fragment, null,
            React.createElement(Button, { type: "button", active: node && node.attrs.align === 'left', onClick: function () {
                    setBlockType(state.schema.nodes[_this.name], {
                        align: 'left'
                    })(state, dispatch);
                } },
                React.createElement(AlignLeftIcon, { style: { width: '24px', height: '24px' } })),
            React.createElement(Button, { type: "button", active: node && node.attrs.align === 'center', onClick: function () {
                    setBlockType(state.schema.nodes[_this.name], {
                        align: 'center'
                    })(state, dispatch);
                } },
                React.createElement(AlignCenterIcon, { style: { width: '24px', height: '24px' } })),
            React.createElement(Button, { type: "button", active: node && node.attrs.align === 'right', onClick: function () {
                    setBlockType(state.schema.nodes[_this.name], {
                        align: 'right'
                    })(state, dispatch);
                } },
                React.createElement(AlignRightIcon, { style: { width: '24px', height: '24px' } }))));
    };
    CustomBlock.prototype.onClick = function (state, dispatch) {
        setBlockType(state.schema.nodes[this.name])(state, dispatch);
    };
    return CustomBlock;
}(Extension));
export default CustomBlock;
//# sourceMappingURL=custom-block.js.map