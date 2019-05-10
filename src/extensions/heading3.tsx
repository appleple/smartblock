import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faHeading } from '@fortawesome/fontawesome-free-solid'
import { setBlockType } from 'prosemirror-commands';
import { Extension } from '../types';

export default class Heading3 implements Extension {
  get name() {
    return 'heading3';
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
        {tag: "h3"},
      ],
      toDOM(node) { return ["h3", 0] }
    }
  }
  get icon() {
    return 'H2'
  }
  onClick (state, dispatch) {
    setBlockType(state.schema.nodes.heading3)(state, dispatch);
  }
}