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
var heading2_1 = require("../components/icons/heading2");
var align_left_1 = require("../components/icons/align-left");
var align_center_1 = require("../components/icons/align-center");
var align_right_1 = require("../components/icons/align-right");
var types_1 = require("../types");
var utils_1 = require("../utils");
var button_1 = require("../components/button");
var constants_1 = require("../constants");
var Heading2 = /** @class */ (function (_super) {
    __extends(Heading2, _super);
    function Heading2(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(Heading2.prototype, "name", {
        // @ts-ignore
        get: function () {
            return 'heading2';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Heading2.prototype, "group", {
        // @ts-ignore
        get: function () {
            return 'block';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Heading2.prototype, "showMenu", {
        // @ts-ignore
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Heading2.prototype, "schema", {
        // @ts-ignore
        get: function () {
            var _this = this;
            if (this.customSchema) {
                return this.customSchema;
            }
            return {
                content: 'inline*',
                group: 'block',
                defining: true,
                attrs: {
                    align: { default: '' },
                    id: { default: '' },
                },
                parseDOM: [
                    {
                        tag: 'h2',
                        priority: constants_1.BASE_PRIORITY,
                        getAttrs: function (dom) {
                            return {
                                id: dom.getAttribute('id') || uuid(),
                            };
                        },
                    },
                ],
                toDOM: function (node) {
                    return [
                        'h2',
                        node.attrs.align
                            ? {
                                style: "text-align: ".concat(node.attrs.align),
                                id: node.attrs.id || uuid(),
                                class: _this.className,
                            }
                            : {
                                id: node.attrs.id || uuid(),
                                class: _this.className,
                            },
                        0,
                    ];
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Heading2.prototype, "icon", {
        // @ts-ignore
        get: function () {
            return React.createElement(heading2_1.default, { style: { width: '24px', height: '24px' } });
        },
        enumerable: false,
        configurable: true
    });
    Heading2.prototype.active = function (state) {
        return (0, utils_1.blockActive)(state.schema.nodes.heading2)(state);
    };
    Heading2.prototype.enable = function (state) {
        return (0, prosemirror_commands_1.setBlockType)(state.schema.nodes.heading2)(state);
    };
    Heading2.prototype.customMenu = function (_a) {
        var state = _a.state, dispatch = _a.dispatch;
        var node = (0, utils_1.getParentNodeFromState)(state);
        return (React.createElement(React.Fragment, null,
            React.createElement(button_1.default, { active: node && node.attrs.align === 'left', type: "button", onClick: function () {
                    (0, prosemirror_commands_1.setBlockType)(state.schema.nodes.heading2, {
                        align: 'left',
                    })(state, dispatch);
                } },
                React.createElement(align_left_1.default, { style: { width: '24px', height: '24px' } })),
            React.createElement(button_1.default, { type: "button", active: node && node.attrs.align === 'center', onClick: function () {
                    (0, prosemirror_commands_1.setBlockType)(state.schema.nodes.heading2, {
                        align: 'center',
                    })(state, dispatch);
                } },
                React.createElement(align_center_1.default, { style: { width: '24px', height: '24px' } })),
            React.createElement(button_1.default, { type: "button", active: node && node.attrs.align === 'right', onClick: function () {
                    (0, prosemirror_commands_1.setBlockType)(state.schema.nodes.heading2, {
                        align: 'right',
                    })(state, dispatch);
                } },
                React.createElement(align_right_1.default, { style: { width: '24px', height: '24px' } }))));
    };
    Heading2.prototype.onClick = function (state, dispatch) {
        (0, prosemirror_commands_1.setBlockType)(state.schema.nodes.heading2)(state, dispatch);
    };
    return Heading2;
}(types_1.Extension));
exports.default = Heading2;
//# sourceMappingURL=heading2.js.map