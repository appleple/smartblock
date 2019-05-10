import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faOutdent } from '@fortawesome/fontawesome-free-solid'
import { lift } from 'prosemirror-commands';
import { Extension } from '../types';

export default class Strong implements Extension {
  get name() {
    return 'lift';
  }
  get showMenu() {
    return true;
  }
  get schema() {
    return {
      group: 'block'
    }
  }
  get icon() {
    return <FontAwesomeIcon icon={faOutdent} />
  }
  onClick (state, dispatch) {
    lift(state, dispatch);
  }
}