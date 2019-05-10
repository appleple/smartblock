import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faStrikethrough } from '@fortawesome/fontawesome-free-solid'
import { toggleMark } from 'prosemirror-commands';
import { Extension } from '../types';
import { markActive } from '../util';

export default class StrikeThrough implements Extension {
  get name() {
    return 'strike';
  }
  get showMenu() {
    return true;
  }
  get schema() {
    return {
      group: 'mark',
      parseDOM: [
        { tag: 'strike' },
        { style: 'text-decoration=line-through' },
        { style: 'text-decoration-line=line-through' }
      ],
      toDOM: () => ['span', {
        style: 'text-decoration-line:line-through'
      }]
    }
  }
  get icon() {
    return <FontAwesomeIcon icon={faStrikethrough} />
  }
  active (state) {
    return markActive(state.schema.marks.strike)(state);
  }
  onClick (state, dispatch) {
    toggleMark(state.schema.marks.strike)(state, dispatch);
  }
}