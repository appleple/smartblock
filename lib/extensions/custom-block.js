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
var uuid = require("uuid/v4");
var align_left_1 = require("../components/icons/align-left");
var align_center_1 = require("../components/icons/align-center");
var align_right_1 = require("../components/icons/align-right");
var types_1 = require("../types");
var utils_1 = require("../utils");
var button_1 = require("../components/button");
var constants_1 = require("../constants");
var CustomBlock = /** @class */ (function (_super) {
    __extends(CustomBlock, _super);
    function CustomBlock(props) {
        if (!props.customName) {
            props.customName = (0, utils_1.getUniqId)();
        }
        return _super.call(this, props) || this;
    }
    Object.defineProperty(CustomBlock.prototype, "name", {
        // @ts-ignore
        get: function () {
            return this.customName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomBlock.prototype, "group", {
        // @ts-ignore
        get: function () {
            return 'block';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomBlock.prototype, "showMenu", {
        // @ts-ignore
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomBlock.prototype, "schema", {
        // @ts-ignore
        get: function () {
            if (this.customSchema) {
                return this.customSchema;
            }
            var _a = this, tagName = _a.tagName, className = _a.className;
            var tag = tagName;
            if (className) {
                tag += ".".concat(className.replace(/\s/g, '.'));
            }
            return {
                content: 'inline*',
                group: 'block',
                defining: true,
                attrs: {
                    align: { default: 'left' },
                    id: { default: '' },
                },
                parseDOM: [
                    {
                        tag: tag,
                        priority: constants_1.CUSTOM_BLOCK_PRIORITY,
                        getAttrs: function (dom) {
                            return {
                                id: dom.getAttribute('id') || uuid(),
                            };
                        },
                    },
                ],
                toDOM: function (node) {
                    return [
                        tagName,
                        {
                            style: "text-align: ".concat(node.attrs.align),
                            id: node.attrs.id || uuid(),
                            class: className,
                        },
                        0,
                    ];
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomBlock.prototype, "icon", {
        // @ts-ignore
        get: function () {
            return this.customIcon;
        },
        enumerable: false,
        configurable: true
    });
    CustomBlock.prototype.active = function (state) {
        return (0, utils_1.blockActive)(state.schema.nodes[this.name])(state);
    };
    CustomBlock.prototype.enable = function (state) {
        return (0, prosemirror_commands_1.setBlockType)(state.schema.nodes[this.name])(state);
    };
    CustomBlock.prototype.customMenu = function (_a) {
        var _this = this;
        var state = _a.state, dispatch = _a.dispatch;
        var node = (0, utils_1.getParentNodeFromState)(state);
        return (React.createElement(React.Fragment, null,
            React.createElement(button_1.default, { type: "button", active: node && node.attrs.align === 'left', onClick: function () {
                    (0, prosemirror_commands_1.setBlockType)(state.schema.nodes[_this.name], {
                        align: 'left',
                    })(state, dispatch);
                } },
                React.createElement(align_left_1.default, { style: { width: '24px', height: '24px' } })),
            React.createElement(button_1.default, { type: "button", active: node && node.attrs.align === 'center', onClick: function () {
                    (0, prosemirror_commands_1.setBlockType)(state.schema.nodes[_this.name], {
                        align: 'center',
                    })(state, dispatch);
                } },
                React.createElement(align_center_1.default, { style: { width: '24px', height: '24px' } })),
            React.createElement(button_1.default, { type: "button", active: node && node.attrs.align === 'right', onClick: function () {
                    (0, prosemirror_commands_1.setBlockType)(state.schema.nodes[_this.name], {
                        align: 'right',
                    })(state, dispatch);
                } },
                React.createElement(align_right_1.default, { style: { width: '24px', height: '24px' } }))));
    };
    CustomBlock.prototype.onClick = function (state, dispatch) {
        (0, prosemirror_commands_1.setBlockType)(state.schema.nodes[this.name])(state, dispatch);
    };
    return CustomBlock;
}(types_1.Extension));
exports.default = CustomBlock;
//# sourceMappingURL=custom-block.js.map