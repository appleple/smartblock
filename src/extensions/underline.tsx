import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faUnderline } from '@fortawesome/fontawesome-free-solid'
import { toggleMark } from 'prosemirror-commands';
import { Extension } from '../types';
import { markActive } from '../utils';

export default class Underline implements Extension {
  get name() {
    return 'underline';
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
    return <FontAwesomeIcon icon={faUnderline} />
  }
  active (state) {
    return markActive(state.schema.marks.underline)(state);
  }
  onClick (state, dispatch) {
    toggleMark(state.schema.marks.underline)(state, dispatch);
  }
}