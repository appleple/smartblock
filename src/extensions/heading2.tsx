import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faHeading, faAlignLeft, faAlignCenter, faAlignRight } from '@fortawesome/fontawesome-free-solid'
import { setBlockType } from 'prosemirror-commands';
import { Extension } from '../types';
import { blockActive } from '../utils';
import Button from '../components/button';
import uuid from 'uuid';

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
        {tag: "h2", getAttrs(dom) {
          return {
            id: dom.getAttribute('id') || uuid()
          }
        }},
      ],
      attrs: {
        align: { default: 'left' },
        id: { default: '' }
      },
      toDOM(node) { return ["h2", {
        style: `text-align: ${node.attrs.align}`,
        id: node.attrs.id || uuid()
      }, 0] }
    }
  }
  get icon() {
    return <FontAwesomeIcon icon={faHeading} />
  }
  active(state) {
    return blockActive(state.schema.nodes.heading2)(state)
  }
  enable(state) {
    return setBlockType(state.schema.nodes.heading2)(state);
  }
  customMenu({ state, dispatch }) {
    return (<>
      <Button 
        type="button"
        onClick={() => {
          setBlockType(state.schema.nodes.heading2, {
            align: 'left'
          })(state, dispatch);
        }}
      ><FontAwesomeIcon icon={faAlignLeft} /></Button>
      <Button 
        type="button"
        onClick={() => {
          setBlockType(state.schema.nodes.heading2, {
            align: 'center'
          })(state, dispatch);
        }}
      ><FontAwesomeIcon icon={faAlignCenter} /></Button>
      <Button onClick={() => {
        setBlockType(state.schema.nodes.heading2, {
          align: 'right'
        })(state, dispatch);
      }}><FontAwesomeIcon icon={faAlignRight} /></Button>
    </>)
  }
  onClick (state, dispatch) {
    setBlockType(state.schema.nodes.heading2)(state, dispatch);
  }
}