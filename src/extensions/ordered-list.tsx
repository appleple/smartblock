import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faListOl, faOutdent, faIndent } from '@fortawesome/fontawesome-free-solid'
import { wrapInList, sinkListItem } from 'prosemirror-schema-list'
import uuid from 'uuid';
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
      parseDOM: [{tag: "ol", getAttrs(dom) {
        return {
          id: dom.getAttribute('id')
        }
      }}],
      attrs: {
        id: { default: '' }
      },
      toDOM(node) { return ["ol", {
        id: node.attrs.id || uuid()
      }, 0] }
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
    return (<>
      <Button 
        type="button"
        onClick={() => {
          liftListItem(state.schema.nodes.list_item)(state, dispatch);
        }}><FontAwesomeIcon icon={faOutdent} />
      </Button>
      <Button 
        type="button"
        onClick={() => {
          sinkListItem(state.schema.nodes.list_item)(state, dispatch);
        }}><FontAwesomeIcon icon={faIndent} />
      </Button>
    </>)
  }
}