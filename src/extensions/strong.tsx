import * as React from 'react';
import { toggleMark } from 'prosemirror-commands';
import StrongIcon from '../components/icons/bold';
import { Dispatch, Extension, ExtensionProps } from '../types';
import { markActive } from '../utils';
import { BASE_PRIORITY } from '../constants';
import { EditorState } from 'prosemirror-state';

export default class Strong extends Extension {
  constructor(props?: ExtensionProps) {
    super(props);
  }

  // @ts-ignore
  get name() {
    return 'strong';
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
          tag: 'strong',
          priority: BASE_PRIORITY,
          style: 'font-weight=bold',
        },
      ],
      toDOM: () => [
        'strong',
        {
          style: 'font-weight:bold',
        },
      ],
    };
  }

  // @ts-ignore
  get icon() {
    return <StrongIcon style={{ width: '24px', height: '24px' }} />;
  }

  active(state: EditorState) {
    return markActive(state.schema.marks.strong)(state);
  }

  onClick(state: EditorState, dispatch: Dispatch) {
    toggleMark(state.schema.marks.strong)(state, dispatch);
  }
}
