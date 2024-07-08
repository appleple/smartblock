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
var prosemirror_schema_list_1 = require("prosemirror-schema-list");
var prosemirror_commands_1 = require("prosemirror-commands");
var types_1 = require("../types");
var utils_1 = require("../utils");
var constants_1 = require("../constants");
var ListItem = /** @class */ (function (_super) {
    __extends(ListItem, _super);
    function ListItem(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(ListItem.prototype, "name", {
        // @ts-ignore
        get: function () {
            return 'list_item';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ListItem.prototype, "showMenu", {
        // @ts-ignore
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ListItem.prototype, "schema", {
        // @ts-ignore
        get: function () {
            if (this.customSchema) {
                return this.customSchema;
            }
            return {
                content: 'paragraph block*',
                group: 'block',
                attrs: {
                    id: { default: '' },
                },
                parseDOM: [
                    {
                        tag: 'li',
                        priority: constants_1.BASE_PRIORITY,
                        getAttrs: function (dom) {
                            return {
                                id: dom.getAttribute('id'),
                            };
                        },
                    },
                ],
                toDOM: function (node) {
                    return ['li', 0];
                },
                defining: true,
            };
        },
        enumerable: false,
        configurable: true
    });
    ListItem.prototype.keys = function (schema) {
        return {
            Enter: (0, prosemirror_schema_list_1.splitListItem)(schema.nodes.list_item),
            Tab: (0, prosemirror_schema_list_1.sinkListItem)(schema.nodes.list_item),
            'Shift-Tab': (0, prosemirror_commands_1.chainCommands)((0, utils_1.liftListItem)(schema.nodes.list_item)),
        };
    };
    return ListItem;
}(types_1.Extension));
exports.default = ListItem;
//# sourceMappingURL=list-item.js.map