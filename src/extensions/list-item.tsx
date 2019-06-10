import { Extension } from "../types";
import { splitListItem, sinkListItem } from "prosemirror-schema-list";
import { Schema } from "prosemirror-model";
import { chainCommands } from "prosemirror-commands";
import uuid from "uuid";
import { liftListItem } from "../utils";

export default class ListItem implements Extension {
  get name() {
    return "list_item";
  }
  get showMenu() {
    return false;
  }
  get schema() {
    return {
      content: "paragraph block*",
      group: "block",
      parseDOM: [
                {
                    tag: "li",
                    getAttrs(dom) {
                        return {
                            id: dom.getAttribute('id')
                        }
                    }}],
      ],
      attrs: {
        id: { default: "" }
      },
      toDOM(node) {
                return [
                    "li",
                    {
                        id: node.attrs.id || uuid()
                    },  0] },
      },
      defining: true
    };
  }
  keys(schema: Schema) {
    return {
      Enter: splitListItem(schema.nodes.list_item),
      Tab: sinkListItem(schema.nodes.list_item),
      "Shift-Tab": chainCommands(liftListItem(schema.nodes.list_item))
    };
  }
}
