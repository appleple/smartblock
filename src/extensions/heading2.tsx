import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faHeading } from '@fortawesome/fontawesome-free-solid'
import { setBlockType } from 'prosemirror-commands';
import { Extension } from '../types';

export default class Heading2 implements Extension {
  get name() {
    return 'heading2';
  }
  get showMenu() {
    return true;
  }
  get schema() {
    return {
      content: "inline*",
      group: "block",
      defining: true,
      parseDOM: [
        {tag: "h2"},
      ],
      toDOM(node) { return ["h2", 0] }
    }
  }
  get icon() {
    return <FontAwesomeIcon icon={faHeading} />
  }
  onClick (state, dispatch) {
    setBlockType(state.schema.nodes.heading2)(state, dispatch);
  }
}