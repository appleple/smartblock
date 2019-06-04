import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faBold } from '@fortawesome/fontawesome-free-solid'
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
    return <FontAwesomeIcon icon={faBold} />
  }
  active (state) {
    return markActive(state.schema.marks.strong)(state);
  }
  onClick (state, dispatch) {
    toggleMark(state.schema.marks.strong)(state, dispatch);
  }
}