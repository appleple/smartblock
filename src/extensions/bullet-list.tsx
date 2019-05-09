import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/fontawesome-free-solid'
import { wrapInList } from 'prosemirror-schema-list'
import { Extension } from '../types';

export default class BulletList implements Extension {
  get name() {
    return 'bullet_list';
  }
  get showMenu() {
    return true;
  }
  get schema() {
    return {
      content: 'list_item+',
      group: 'block',
      parseDOM: [{tag: "ul"}],
      toDOM() { return ["ul", 0] }
    }
  }
  get icon() {
    return <FontAwesomeIcon icon={faList} />
  }
  onClick (state, dispatch) {
    wrapInList(state.schema.nodes.bullet_list)(state, dispatch);
  }
}