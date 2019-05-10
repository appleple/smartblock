import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faParagraph } from '@fortawesome/fontawesome-free-solid'
import { setBlockType } from 'prosemirror-commands';
import { Extension } from '../types';
import { blockActive } from '../util';

export default class Paragraph implements Extension {
  get name() {
    return 'paragraph';
  }
  get showMenu() {
    return true;
  }
  get schema() {
    return {
      content: 'inline*',
      group: 'block',
      parseDOM: [{
        tag: 'p'
      }],
      toDOM: () => ["p", 0]
    }
  }
  get icon() {
    return <FontAwesomeIcon icon={faParagraph} />
  }
  active(state) {
    return blockActive(state.schema.nodes.paragraph)(state)
  }
  enable(state) {
    return setBlockType(state.schema.nodes.paragraph)(state);
  }
  onClick (state, dispatch) {
    setBlockType(state.schema.nodes.paragraph)(state, dispatch);
  }
}