import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/fontawesome-free-solid'
import { wrapInList } from 'prosemirror-schema-list'
import { Extension } from '../types';
import { blockActive } from '../util';

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
  active(state) {
    return blockActive(state.schema.nodes.bullet_list)(state)
  }
  enable(state) {
    return wrapInList(state.schema.nodes.bullet_list)(state);
  }
  onClick (state, dispatch) {
    wrapInList(state.schema.nodes.bullet_list)(state, dispatch);
  }
}