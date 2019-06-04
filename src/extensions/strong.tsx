import * as React from 'react';
import Icon from '../components/icon';
import bold from '../assets/images/icons/bold.svg';
import { toggleMark } from 'prosemirror-commands';
import { Extension } from '../types';
import { markActive } from '../utils';

export default class Strong implements Extension {
  get name() {
    return 'strong';
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
        { tag: 'strong' },
        { style: 'font-weight=bold' }
      ],
      toDOM: () => ['span', {
        style: 'font-weight:bold'
      }]
    }
  }
  get icon() {
    return <Icon src={bold} width={24} height={24} />
  }
  active (state) {
    return markActive(state.schema.marks.strong)(state);
  }
  onClick (state, dispatch) {
    toggleMark(state.schema.marks.strong)(state, dispatch);
  }
}