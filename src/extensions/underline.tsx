import * as React from 'react';
import { toggleMark } from 'prosemirror-commands';
import UnderlineIcon from '../components/icons/underline';
import { Extension, ExtensionProps } from '../types';
import { markActive } from '../utils';
import { BASE_PRIORITY } from '../constants';

export default class Underline extends Extension {
  constructor(props?: ExtensionProps) {
    super(props);
  }

  get name() {
    return 'underline';
  }

  get group() {
    return 'mark';
  }

  get showMenu() {
    return true;
  }

  get schema() {
    if (this.customSchema) {
      return this.customSchema;
    }
    return {
      group: 'mark',
      parseDOM: [
        {
          tag: 'u',
          priority: BASE_PRIORITY,
          style: 'text-decoration=underline',
        },
      ],
      toDOM: () => [
        'span',
        {
          style: 'text-decoration:underline',
          class: this.className,
        },
      ],
    };
  }

  get icon() {
    return <UnderlineIcon style={{ width: '24px', height: '24px' }} />;
  }

  active(state) {
    return markActive(state.schema.marks.underline)(state);
  }

  onClick(state, dispatch) {
    toggleMark(state.schema.marks.underline)(state, dispatch);
  }
}
