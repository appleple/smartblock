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
var Blockquote_1 = require("../components/icons/Blockquote");
var types_1 = require("../types");
var utils_1 = require("../utils");
var BlockQuote = /** @class */ (function (_super) {
    __extends(BlockQuote, _super);
    function BlockQuote(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(BlockQuote.prototype, "name", {
        get: function () {
            return 'blockquote';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlockQuote.prototype, "group", {
        get: function () {
            return 'block';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlockQuote.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlockQuote.prototype, "schema", {
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
                        tag: 'blockquote',
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
                        'blockquote',
                        {
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
    Object.defineProperty(BlockQuote.prototype, "icon", {
        get: function () {
            return React.createElement(Blockquote_1.default, { style: { width: '24px', height: '24px' } });
        },
        enumerable: true,
        configurable: true
    });
    BlockQuote.prototype.active = function (state) {
        return utils_1.blockActive(state.schema.nodes.blockquote)(state);
    };
    BlockQuote.prototype.enable = function (state) {
        return prosemirror_commands_1.setBlockType(state.schema.nodes.blockquote)(state);
    };
    BlockQuote.prototype.onClick = function (state, dispatch) {
        prosemirror_commands_1.setBlockType(state.schema.nodes.blockquote)(state, dispatch);
    };
    return BlockQuote;
}(types_1.Extension));
exports.default = BlockQuote;
//# sourceMappingURL=blockquote.js.map