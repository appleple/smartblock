import { splitListItem, sinkListItem } from 'prosemirror-schema-list';
import { Schema, Node } from 'prosemirror-model';
import { chainCommands } from 'prosemirror-commands';
import { Extension, ExtensionProps } from '../types';
import { liftListItem } from '../utils';
import { BASE_PRIORITY } from '../constants';

export default class ListItem extends Extension {
  constructor(props?: ExtensionProps) {
    super(props);
  }

  // @ts-ignore
  get name() {
    return 'list_item';
  }

  // @ts-ignore
  get showMenu() {
    return false;
  }

  // @ts-ignore
  get schema() {
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
          priority: BASE_PRIORITY,
          getAttrs(dom: HTMLElement) {
            return {
              id: dom.getAttribute('id'),
            };
          },
        },
      ],
      toDOM(node: Node) {
        return ['li', 0];
      },
      defining: true,
    };
  }

  keys(schema: Schema) {
    return {
      Enter: splitListItem(schema.nodes.list_item),
      Tab: sinkListItem(schema.nodes.list_item),
      'Shift-Tab': chainCommands(liftListItem(schema.nodes.list_item)),
    };
  }
}
