import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faAlignLeft, faAlignCenter, faAlignRight } from '@fortawesome/fontawesome-free-solid'
import { setBlockType } from 'prosemirror-commands';
import { Extension } from '../types';
import { blockActive } from '../util';
import Button from '../components/Button';

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
      toDOM(node) { return ["h3", {
        style: `text-align: ${node.attrs.align}`
      }, 0] }
    }
  }
  get icon() {
    return 'H2'
  }
  active(state) {
    return blockActive(state.schema.nodes.heading3)(state)
  }
  enable(state) {
    return setBlockType(state.schema.nodes.heading3)(state);
  }
  customMenu({ state, dispatch }) {
    return (<>
      <Button onClick={() => {
        setBlockType(state.schema.nodes.heading3, {
          align: 'left'
        })(state, dispatch);
      }}><FontAwesomeIcon icon={faAlignLeft} /></Button>
      <Button onClick={() => {
        setBlockType(state.schema.nodes.heading3, {
          align: 'center'
        })(state, dispatch);
      }}><FontAwesomeIcon icon={faAlignCenter} /></Button>
      <Button onClick={() => {
        setBlockType(state.schema.nodes.heading3, {
          align: 'right'
        })(state, dispatch);
      }}><FontAwesomeIcon icon={faAlignRight} /></Button>
    </>)
  }
  onClick (state, dispatch) {
    setBlockType(state.schema.nodes.heading3)(state, dispatch);
  }
}