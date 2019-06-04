import * as React from 'react';
import Icon from '../components/icon';
import underline from '../assets/images/icons/underline.svg';
import { toggleMark } from 'prosemirror-commands';
import { Extension } from '../types';
import { markActive } from '../utils';

export default class Underline implements Extension {
  get name() {
    return 'underline';
  }
  get group() {
    return "mark"
  }
  get showMenu() {
    return true;
  }
  get schema() {
    return {
      group: 'mark',
      parseDOM: [
        { tag: 'u' },
        { style: 'text-decoration=underline' }
      ],
      toDOM: () => ['span', {
        style: 'text-decoration:underline'
      }]
    }
  }
  get icon() {
    return <Icon src={underline} width={24} height={24} />
  }
  active (state) {
    return markActive(state.schema.marks.underline)(state);
  }
  onClick (state, dispatch) {
    toggleMark(state.schema.marks.underline)(state, dispatch);
  }
}