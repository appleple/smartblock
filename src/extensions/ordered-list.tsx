import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faListOl } from '@fortawesome/fontawesome-free-solid'
import { wrapInList } from 'prosemirror-schema-list'
import { Extension } from '../types';

export default class BulletList implements Extension {
  get name() {
    return 'ordered_list';
  }
  get showMenu() {
    return true;
  }
  get schema() {
    return {
      content: 'list_item+',
      group: 'block',
      parseDOM: [{tag: "ol"}],
      toDOM() { return ["ol", 0] }
    }
  }
  get icon() {
    return <FontAwesomeIcon icon={faListOl} />
  }
  onClick (state, dispatch) {
    wrapInList(state.schema.nodes.ordered_list)(state, dispatch);
  }
}