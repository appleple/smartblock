import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faParagraph, faAlignLeft, faAlignCenter, faAlignRight } from '@fortawesome/fontawesome-free-solid'
import { setBlockType } from 'prosemirror-commands';
import uuid from 'uuid';
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
        tag: 'p', getAttrs(dom) {
          return {
            id: dom.getAttribute('id') || uuid()
          }
        }
      }],
      attrs: {
        align: { default: 'left' },
        id: { default: '' }
      },
      toDOM: (node) => {
        return ["p", {
          style: `text-align: ${node.attrs.align}`,
          id: node.attrs.id || uuid()
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
      <Button 
        type="button"
        onClick={() => {
          setBlockType(state.schema.nodes.paragraph, {
            align: 'left'
          })(state, dispatch);
        }}
      ><FontAwesomeIcon icon={faAlignLeft} /></Button>
      <Button 
        type="button"
        onClick={() => {
          setBlockType(state.schema.nodes.paragraph, {
            align: 'center'
          })(state, dispatch);
        }}
      ><FontAwesomeIcon icon={faAlignCenter} /></Button>
      <Button 
        type="button"
        onClick={() => {
          setBlockType(state.schema.nodes.paragraph, {
            align: 'right'
          })(state, dispatch);
        }}
      ><FontAwesomeIcon icon={faAlignRight} /></Button>
    </>)
  }
  onClick (state, dispatch) {
    setBlockType(state.schema.nodes.paragraph)(state, dispatch);
  }
}