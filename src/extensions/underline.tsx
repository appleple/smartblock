import * as React from 'react';
import { toggleMark } from 'prosemirror-commands';
import UnderlineIcon from '../components/icons/underline';
import { Dispatch, Extension, ExtensionProps } from '../types';
import { markActive } from '../utils';
import { BASE_PRIORITY } from '../constants';
import { EditorState } from 'prosemirror-state';

export default class Underline extends Extension {
  constructor(props?: ExtensionProps) {
    super(props);
  }

  // @ts-ignore
  get name() {
    return 'underline';
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

  // @ts-ignore
  get icon() {
    return <UnderlineIcon style={{ width: '24px', height: '24px' }} />;
  }

  active(state: EditorState) {
    return markActive(state.schema.marks.underline)(state);
  }

  onClick(state: EditorState, dispatch: Dispatch) {
    toggleMark(state.schema.marks.underline)(state, dispatch);
  }
}
