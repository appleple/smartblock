import * as React from 'react';
import Icon from '../components/icon';
import heading1 from '../assets/images/icons/heading1.svg';
import alignLeft from '../assets/images/icons/align-left.svg';
import alignCenter from '../assets/images/icons/align-center.svg';
import alignRight from '../assets/images/icons/align-right.svg';
import { setBlockType } from 'prosemirror-commands';
import { Extension } from '../types';
import { blockActive } from '../utils';
import Button from '../components/button';
import uuid from 'uuid';

export default class Heading2 implements Extension {
  get name() {
    return 'heading2';
  }
  get group() {
    return 'block'
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
    return <Icon src={heading1} width={24} height={24} />
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
      >
        <Icon src={alignLeft} width={24} height={24} />
      </Button>
      <Button 
        type="button"
        onClick={() => {
          setBlockType(state.schema.nodes.heading2, {
            align: 'center'
          })(state, dispatch);
        }}
      >
        <Icon src={alignCenter} width={24} height={24} />
      </Button>
      <Button onClick={() => {
        setBlockType(state.schema.nodes.heading2, {
          align: 'right'
        })(state, dispatch);
      }}>
        <Icon src={alignRight} width={24} height={24} />
      </Button>
    </>)
  }
  onClick (state, dispatch) {
    setBlockType(state.schema.nodes.heading2)(state, dispatch);
  }
}