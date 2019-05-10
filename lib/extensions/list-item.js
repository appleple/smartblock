"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_schema_list_1 = require("prosemirror-schema-list");
var ListItem = /** @class */ (function () {
    function ListItem() {
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
            return {
                content: 'paragraph block*',
                group: 'block',
                parseDOM: [{ tag: "li" }],
                toDOM: function () { return ["li", 0]; },
                defining: true
            };
        },
        enumerable: true,
        configurable: true
    });
    ListItem.prototype.keys = function (schema) {
        return {
            'Enter': prosemirror_schema_list_1.splitListItem(schema.nodes.list_item),
        };
    };
    return ListItem;
}());
exports.default = ListItem;
//# sourceMappingURL=list-item.js.map