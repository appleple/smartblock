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
var uuid = require("uuid");
var Paragraph_1 = require("../components/icons/Paragraph");
var AlignLeft_1 = require("../components/icons/AlignLeft");
var AlignCenter_1 = require("../components/icons/AlignCenter");
var AlignRight_1 = require("../components/icons/AlignRight");
var types_1 = require("../types");
var utils_1 = require("../utils");
var button_1 = require("../components/button");
var Paragraph = /** @class */ (function (_super) {
    __extends(Paragraph, _super);
    function Paragraph(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(Paragraph.prototype, "name", {
        get: function () {
            return 'paragraph';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paragraph.prototype, "group", {
        get: function () {
            return 'block';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paragraph.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paragraph.prototype, "schema", {
        get: function () {
            var _this = this;
            if (this.customSchema) {
                return this.customSchema;
            }
            return {
                content: 'inline*',
                group: 'block',
                parseDOM: [
                    {
                        tag: 'p',
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
                        'p',
                        {
                            style: "text-align: " + node.attrs.align,
                            id: node.attrs.id || uuid(),
                            class: _this.className
                        },
                        0
                    ];
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paragraph.prototype, "icon", {
        get: function () {
            return React.createElement(Paragraph_1.default, { style: { width: '24px', height: '24px' } });
        },
        enumerable: true,
        configurable: true
    });
    Paragraph.prototype.active = function (state) {
        return utils_1.blockActive(state.schema.nodes.paragraph)(state);
    };
    Paragraph.prototype.enable = function (state) {
        return prosemirror_commands_1.setBlockType(state.schema.nodes.paragraph)(state);
    };
    Paragraph.prototype.customMenu = function (_a) {
        var state = _a.state, dispatch = _a.dispatch;
        var node = utils_1.getParentNodeFromState(state);
        return (React.createElement(React.Fragment, null,
            React.createElement(button_1.default, { type: "button", active: node && node.attrs.align === 'left', onClick: function () {
                    prosemirror_commands_1.setBlockType(state.schema.nodes.paragraph, {
                        align: 'left'
                    })(state, dispatch);
                } },
                React.createElement(AlignLeft_1.default, { style: { width: '24px', height: '24px' } })),
            React.createElement(button_1.default, { type: "button", active: node && node.attrs.align === 'center', onClick: function () {
                    prosemirror_commands_1.setBlockType(state.schema.nodes.paragraph, {
                        align: 'center'
                    })(state, dispatch);
                } },
                React.createElement(AlignCenter_1.default, { style: { width: '24px', height: '24px' } })),
            React.createElement(button_1.default, { type: "button", active: node && node.attrs.align === 'right', onClick: function () {
                    prosemirror_commands_1.setBlockType(state.schema.nodes.paragraph, {
                        align: 'right'
                    })(state, dispatch);
                } },
                React.createElement(AlignRight_1.default, { style: { width: '24px', height: '24px' } }))));
    };
    Paragraph.prototype.onClick = function (state, dispatch) {
        prosemirror_commands_1.setBlockType(state.schema.nodes.paragraph)(state, dispatch);
    };
    return Paragraph;
}(types_1.Extension));
exports.default = Paragraph;
//# sourceMappingURL=paragraph.js.map