import * as React from 'react';
import { toggleMark } from 'prosemirror-commands';
import StrikeIcon from '../components/icons/strike';
import { Extension, ExtensionProps } from '../types';
import { markActive } from '../utils';
import { BASE_PRIORITY } from '../constants';

export default class StrikeThrough extends Extension {
  constructor(props?: ExtensionProps) {
    super(props);
  }

  // @ts-ignore
  get name() {
    return 'strike';
  }

  // @ts-ignore
  get group() {
    return 'mark';
  }

  // @ts-ignore
  get showMenu() {
    return true;
  }

  // @ts-ignore
  get schema() {
    if (this.customSchema) {
      return this.customSchema;
    }
    return {
      group: 'mark',
      parseDOM: [
        {
          tag: 'strike',
          priority: BASE_PRIORITY,
          style: 'text-decoration=line-through' || 'text-decoration-line=line-through',
        },
      ],
      toDOM: () => [
        'span',
        {
          style: 'text-decoration-line:line-through',
          class: this.className,
        },
      ],
    };
  }

  // @ts-ignore
  get icon() {
    return <StrikeIcon style={{ width: '24px', height: '24px' }} />;
  }

  active(state) {
    return markActive(state.schema.marks.strike)(state);
  }

  onClick(state, dispatch) {
    toggleMark(state.schema.marks.strike)(state, dispatch);
  }
}
