import * as React from 'react';
import Icon from '../components/icon';
import paragraph from '../assets/images/icons/paragraph.svg';
import alignLeft from '../assets/images/icons/align-left.svg';
import alignCenter from '../assets/images/icons/align-center.svg';
import alignRight from '../assets/images/icons/align-right.svg';
import { setBlockType } from 'prosemirror-commands';
import uuid from 'uuid';
import { Extension } from '../types';
import { blockActive } from '../utils';
import Button from '../components/button';

export default class Paragraph implements Extension {
  get name() {
    return 'paragraph';
  }
  get group() {
    return 'block';
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
    return <Icon src={paragraph} width={24} height={24} />
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
      ><Icon src={alignLeft} width={24} height={24} /></Button>
      <Button 
        type="button"
        onClick={() => {
          setBlockType(state.schema.nodes.paragraph, {
            align: 'center'
          })(state, dispatch);
        }}
      ><Icon src={alignCenter} width={24} height={24} /></Button>
      <Button 
        type="button"
        onClick={() => {
          setBlockType(state.schema.nodes.paragraph, {
            align: 'right'
          })(state, dispatch);
        }}
      ><Icon src={alignRight} width={24} height={24} /></Button>
    </>)
  }
  onClick (state, dispatch) {
    setBlockType(state.schema.nodes.paragraph)(state, dispatch);
  }
}