import { splitListItem, sinkListItem } from 'prosemirror-schema-list';
import { chainCommands } from 'prosemirror-commands';
import uuid from 'uuid';
import { liftListItem } from '../utils';
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
                parseDOM: [{ tag: "li", getAttrs: function (dom) {
                            return {
                                id: dom.getAttribute('id')
                            };
                        } }],
                attrs: {
                    id: { default: '' }
                },
                toDOM: function (node) {
                    return ["li", {
                            id: node.attrs.id || uuid()
                        }, 0];
                },
                defining: true
            };
        },
        enumerable: true,
        configurable: true
    });
    ListItem.prototype.keys = function (schema) {
        return {
            'Enter': splitListItem(schema.nodes.list_item),
            'Tab': sinkListItem(schema.nodes.list_item),
            'Shift-Tab': chainCommands(liftListItem(schema.nodes.list_item))
        };
    };
    return ListItem;
}());
export default ListItem;
//# sourceMappingURL=list-item.js.map