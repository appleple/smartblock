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
var blockquote_1 = require("../components/icons/blockquote");
var types_1 = require("../types");
var utils_1 = require("../utils");
var constants_1 = require("../constants");
var BlockQuote = /** @class */ (function (_super) {
    __extends(BlockQuote, _super);
    function BlockQuote(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(BlockQuote.prototype, "name", {
        // @ts-ignore
        get: function () {
            return 'blockquote';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BlockQuote.prototype, "group", {
        // @ts-ignore
        get: function () {
            return 'block';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BlockQuote.prototype, "showMenu", {
        // @ts-ignore
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BlockQuote.prototype, "schema", {
        // @ts-ignore
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
                        priority: constants_1.BASE_PRIORITY,
                        getAttrs: function (dom) {
                            return {
                                id: dom.getAttribute('id') || uuid(),
                            };
                        },
                    },
                ],
                attrs: {
                    align: { default: 'left' },
                    id: { default: '' },
                },
                toDOM: function (node) {
                    return [
                        'blockquote',
                        {
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
    Object.defineProperty(BlockQuote.prototype, "icon", {
        // @ts-ignore
        get: function () {
            return React.createElement(blockquote_1.default, { style: { width: '24px', height: '24px' } });
        },
        enumerable: false,
        configurable: true
    });
    BlockQuote.prototype.active = function (state) {
        return (0, utils_1.blockActive)(state.schema.nodes.blockquote)(state);
    };
    BlockQuote.prototype.enable = function (state) {
        return (0, prosemirror_commands_1.setBlockType)(state.schema.nodes.blockquote)(state);
    };
    BlockQuote.prototype.onClick = function (state, dispatch) {
        (0, prosemirror_commands_1.setBlockType)(state.schema.nodes.blockquote)(state, dispatch);
    };
    return BlockQuote;
}(types_1.Extension));
exports.default = BlockQuote;
//# sourceMappingURL=blockquote.js.map