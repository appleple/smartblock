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
var uuid = require("uuid/v4");
var Heading4_1 = require("../components/icons/Heading4");
var AlignLeft_1 = require("../components/icons/AlignLeft");
var AlignCenter_1 = require("../components/icons/AlignCenter");
var AlignRight_1 = require("../components/icons/AlignRight");
var types_1 = require("../types");
var utils_1 = require("../utils");
var button_1 = require("../components/button");
var Heading4 = /** @class */ (function (_super) {
    __extends(Heading4, _super);
    function Heading4(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(Heading4.prototype, "name", {
        get: function () {
            return 'heading4';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Heading4.prototype, "group", {
        get: function () {
            return 'block';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Heading4.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Heading4.prototype, "schema", {
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
                        tag: 'h4',
                        getAttrs: function (dom) {
                            return {
                                id: dom.getAttribute('id') || uuid()
                            };
                        }
                    }
                ],
                attrs: {
                    align: { default: '' },
                    id: { default: '' }
                },
                toDOM: function (node) {
                    return [
                        'h4',
                        (node.attrs.align ? {
                            style: "text-align: " + node.attrs.align,
                            class: this.className
                        } : {
                            class: this.className
                        }),
                        0
                    ];
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Heading4.prototype, "icon", {
        get: function () {
            return React.createElement(Heading4_1.default, { style: { width: '24px', height: '24px' } });
        },
        enumerable: true,
        configurable: true
    });
    Heading4.prototype.active = function (state) {
        return utils_1.blockActive(state.schema.nodes.heading4)(state);
    };
    Heading4.prototype.enable = function (state) {
        return prosemirror_commands_1.setBlockType(state.schema.nodes.heading4)(state);
    };
    Heading4.prototype.customMenu = function (_a) {
        var state = _a.state, dispatch = _a.dispatch;
        var node = utils_1.getParentNodeFromState(state);
        return (React.createElement(React.Fragment, null,
            React.createElement(button_1.default, { active: node && node.attrs.align === 'left', type: "button", onClick: function () {
                    prosemirror_commands_1.setBlockType(state.schema.nodes.heading4, {
                        align: 'left'
                    })(state, dispatch);
                } },
                React.createElement(AlignLeft_1.default, { style: { width: '24px', height: '24px' } })),
            React.createElement(button_1.default, { type: "button", active: node && node.attrs.align === 'center', onClick: function () {
                    prosemirror_commands_1.setBlockType(state.schema.nodes.heading4, {
                        align: 'center'
                    })(state, dispatch);
                } },
                React.createElement(AlignCenter_1.default, { style: { width: '24px', height: '24px' } })),
            React.createElement(button_1.default, { type: "button", active: node && node.attrs.align === 'right', onClick: function () {
                    prosemirror_commands_1.setBlockType(state.schema.nodes.heading4, {
                        align: 'right'
                    })(state, dispatch);
                } },
                React.createElement(AlignRight_1.default, { style: { width: '24px', height: '24px' } }))));
    };
    Heading4.prototype.onClick = function (state, dispatch) {
        prosemirror_commands_1.setBlockType(state.schema.nodes.heading4)(state, dispatch);
    };
    return Heading4;
}(types_1.Extension));
exports.default = Heading4;
//# sourceMappingURL=heading4.js.map