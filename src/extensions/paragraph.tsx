import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faParagraph } from '@fortawesome/fontawesome-free-solid'
import { setBlockType } from 'prosemirror-commands';
import { Extension } from '../types';

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
  onClick (state, dispatch) {
    setBlockType(state.schema.nodes.paragraph)(state, dispatch);
  }
}