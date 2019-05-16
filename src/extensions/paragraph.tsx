import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faParagraph, faAlignLeft, faAlignCenter, faAlignRight } from '@fortawesome/fontawesome-free-solid'
import { setBlockType } from 'prosemirror-commands';
import { Extension } from '../types';
import { blockActive } from '../utils';
import Button from '../components/button';

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
      attrs: {
        align: { default: 'left' } 
      },
      toDOM: (node) => {
        return ["p", {
          style: `text-align: ${node.attrs.align}`
        }, 0]
      }
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
  customMenu({ state, dispatch }) {
    return (<>
      <Button onClick={() => {
        setBlockType(state.schema.nodes.paragraph, {
          align: 'left'
        })(state, dispatch);
      }}><FontAwesomeIcon icon={faAlignLeft} /></Button>
      <Button onClick={() => {
        setBlockType(state.schema.nodes.paragraph, {
          align: 'center'
        })(state, dispatch);
      }}><FontAwesomeIcon icon={faAlignCenter} /></Button>
      <Button onClick={() => {
        setBlockType(state.schema.nodes.paragraph, {
          align: 'right'
        })(state, dispatch);
      }}><FontAwesomeIcon icon={faAlignRight} /></Button>
    </>)
  }
  onClick (state, dispatch) {
    setBlockType(state.schema.nodes.paragraph)(state, dispatch);
  }
}