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
var prosemirror_schema_list_1 = require("prosemirror-schema-list");
var prosemirror_commands_1 = require("prosemirror-commands");
var uuid = require("uuid/v4");
var types_1 = require("../types");
var utils_1 = require("../utils");
var ListItem = /** @class */ (function (_super) {
    __extends(ListItem, _super);
    function ListItem(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(ListItem.prototype, "name", {
        get: function () {
            return 'list_item';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListItem.prototype, "showMenu", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListItem.prototype, "schema", {
        get: function () {
            if (this.customSchema) {
                return this.customSchema;
            }
            return {
                content: 'paragraph block*',
                group: 'block',
                parseDOM: [
                    {
                        tag: 'li',
                        getAttrs: function (dom) {
                            return {
                                id: dom.getAttribute('id')
                            };
                        }
                    }
                ],
                attrs: {
                    id: { default: '' }
                },
                toDOM: function (node) {
                    return [
                        'li',
                        {
                            id: node.attrs.id || uuid()
                        },
                        0
                    ];
                },
                defining: true
            };
        },
        enumerable: true,
        configurable: true
    });
    ListItem.prototype.keys = function (schema) {
        return {
            Enter: prosemirror_schema_list_1.splitListItem(schema.nodes.list_item),
            Tab: prosemirror_schema_list_1.sinkListItem(schema.nodes.list_item),
            'Shift-Tab': prosemirror_commands_1.chainCommands(utils_1.liftListItem(schema.nodes.list_item))
        };
    };
    return ListItem;
}(types_1.Extension));
exports.default = ListItem;
//# sourceMappingURL=list-item.js.map