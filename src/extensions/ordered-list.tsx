import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faListOl, faOutdent, faIndent } from '@fortawesome/fontawesome-free-solid'
import { wrapInList, sinkListItem } from 'prosemirror-schema-list'
import { liftListItem } from '../utils';
import { Extension } from '../types';
import { blockActive } from '../utils';
import Button from '../components/button';

export default class OrderedList implements Extension {
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
  active(state) {
    return blockActive(state.schema.nodes.ordered_list)(state)
  }
  enable(state) {
    return wrapInList(state.schema.nodes.ordered_list)(state);
  }
  onClick (state, dispatch) {
    wrapInList(state.schema.nodes.ordered_list)(state, dispatch);
  }
  customMenu({ state, dispatch }) {
    return (<><Button onClick={() => {
      liftListItem(state.schema.nodes.list_item)(state, dispatch);
    }}><FontAwesomeIcon icon={faOutdent} /></Button>
    <Button onClick={() => {
      sinkListItem(state.schema.nodes.list_item)(state, dispatch);
    }}><FontAwesomeIcon icon={faIndent} /></Button>
    </>)
  }
}