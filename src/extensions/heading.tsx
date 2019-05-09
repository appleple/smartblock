import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faHeading } from '@fortawesome/fontawesome-free-solid'
import { setBlockType } from 'prosemirror-commands';
import { Extension } from '../types';
import { Schema } from 'prosemirror-model';

export default class Heading implements Extension {
  get name() {
    return 'heading';
  }
  get showMenu() {
    return true;
  }
  get schema() {
    return {
      attrs: {level: {default: 1}},
      content: "inline*",
      group: "block",
      defining: true,
      parseDOM: [
        {tag: "h1", attrs: {level: 1}},
        {tag: "h2", attrs: {level: 2}},
        {tag: "h3", attrs: {level: 3}},
        {tag: "h4", attrs: {level: 4}},
        {tag: "h5", attrs: {level: 5}},
        {tag: "h6", attrs: {level: 6}}
      ],
      toDOM(node) { return ["h" + node.attrs.level, 0] }
    }
  }
  get icon() {
    return <FontAwesomeIcon icon={faHeading} />
  }
  onClick (state, dispatch) {
    setBlockType(state.schema.nodes.heading)(state, dispatch);
  }
}