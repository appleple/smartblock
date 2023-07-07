import { splitListItem, sinkListItem } from 'prosemirror-schema-list';
import { Schema } from 'prosemirror-model';
import { chainCommands } from 'prosemirror-commands';
import { Extension, ExtensionProps } from '../types';
import { liftListItem } from '../utils';

export default class ListItem extends Extension {
  constructor(props?: ExtensionProps) {
    super(props);
  }

  get name() {
    return 'list_item';
  }

  get showMenu() {
    return false;
  }

  get schema() {
    if (this.customSchema) {
      return this.customSchema;
    }
    return {
      content: 'paragraph block*',
      group: 'block',
      attrs: {
        id: { default: '' }
      },
      parseDOM: [
        {
          tag: 'li',
          getAttrs(dom) {
            return {
              id: dom.getAttribute('id')
            }
          }
        }
      ],
      toDOM(node) {
        return ['li', 0]
      },
      defining: true
    }
  }

  keys(schema: Schema) {
    return {
      Enter: splitListItem(schema.nodes.list_item),
      Tab: sinkListItem(schema.nodes.list_item),
      'Shift-Tab': chainCommands(liftListItem(schema.nodes.list_item))
    }
  }
}
