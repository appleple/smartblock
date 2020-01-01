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
var uuid_1 = require("uuid");
var AlignLeft_1 = require("../components/icons/AlignLeft");
var AlignCenter_1 = require("../components/icons/AlignCenter");
var AlignRight_1 = require("../components/icons/AlignRight");
var types_1 = require("../types");
var utils_1 = require("../utils");
var button_1 = require("../components/button");
var CustomBlock = /** @class */ (function (_super) {
    __extends(CustomBlock, _super);
    function CustomBlock(props) {
        var _this = this;
        if (!props.customName) {
            props.customName = utils_1.getUniqId();
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
                                id: dom.getAttribute('id') || uuid_1.default()
                            };
                        }
                    }
                ],
                toDOM: function (node) {
                    return [
                        tagName,
                        {
                            style: "text-align: " + node.attrs.align,
                            id: node.attrs.id || uuid_1.default(),
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
        return utils_1.blockActive(state.schema.nodes[this.name])(state);
    };
    CustomBlock.prototype.enable = function (state) {
        return prosemirror_commands_1.setBlockType(state.schema.nodes[this.name])(state);
    };
    CustomBlock.prototype.customMenu = function (_a) {
        var _this = this;
        var state = _a.state, dispatch = _a.dispatch;
        var node = utils_1.getParentNodeFromState(state);
        return (React.createElement(React.Fragment, null,
            React.createElement(button_1.default, { type: "button", active: node && node.attrs.align === 'left', onClick: function () {
                    prosemirror_commands_1.setBlockType(state.schema.nodes[_this.name], {
                        align: 'left'
                    })(state, dispatch);
                } },
                React.createElement(AlignLeft_1.default, { style: { width: '24px', height: '24px' } })),
            React.createElement(button_1.default, { type: "button", active: node && node.attrs.align === 'center', onClick: function () {
                    prosemirror_commands_1.setBlockType(state.schema.nodes[_this.name], {
                        align: 'center'
                    })(state, dispatch);
                } },
                React.createElement(AlignCenter_1.default, { style: { width: '24px', height: '24px' } })),
            React.createElement(button_1.default, { type: "button", active: node && node.attrs.align === 'right', onClick: function () {
                    prosemirror_commands_1.setBlockType(state.schema.nodes[_this.name], {
                        align: 'right'
                    })(state, dispatch);
                } },
                React.createElement(AlignRight_1.default, { style: { width: '24px', height: '24px' } }))));
    };
    CustomBlock.prototype.onClick = function (state, dispatch) {
        prosemirror_commands_1.setBlockType(state.schema.nodes[this.name])(state, dispatch);
    };
    return CustomBlock;
}(types_1.Extension));
exports.default = CustomBlock;
//# sourceMappingURL=custom-block.js.map