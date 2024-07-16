import * as React from 'react';
import { toggleMark } from 'prosemirror-commands';
import EmIcon from '../components/icons/em';
import { Dispatch, Extension, ExtensionProps } from '../types';
import { markActive } from '../utils';
import { BASE_PRIORITY } from '../constants';
import { EditorState } from 'prosemirror-state';

export default class Emphasis extends Extension {
  constructor(props?: ExtensionProps) {
    super(props);
  }

  // @ts-ignore
  get name() {
    return 'em';
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
          tag: 'em',
          priority: BASE_PRIORITY,
          style: 'font-style=italic',
        },
      ],
      toDOM: () => [
        'span',
        {
          class: this.className,
          style: 'font-style:italic',
        },
      ],
    };
  }

  // @ts-ignore
  get icon() {
    return <EmIcon style={{ width: '24px', height: '24px' }} />;
  }

  active(state: EditorState) {
    return markActive(state.schema.marks.em)(state);
  }

  onClick(state: EditorState, dispatch: Dispatch) {
    toggleMark(state.schema.marks.em)(state, dispatch);
  }
}
