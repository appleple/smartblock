import { Extension } from '../types';
import { splitListItem, sinkListItem } from 'prosemirror-schema-list'
import { Schema } from "prosemirror-model"
import { chainCommands } from 'prosemirror-commands';
import { liftListItem } from '../utils';

export default class ListItem implements Extension {
  get name() {
    return 'list_item';
  }
  get showMenu() {
    return false;
  }
  get schema() {
    return {
      content: 'paragraph block*',
      group: 'block',
      parseDOM: [{tag: "li"}],
      toDOM() { return ["li", 0] },
      defining: true
    }
  }
  keys(schema: Schema) {
    return {
      'Enter': splitListItem(schema.nodes.list_item),
      'Tab': sinkListItem(schema.nodes.list_item),
      'Shift-Tab': chainCommands(liftListItem(schema.nodes.list_item))
    }
  }
}