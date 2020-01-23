import * as React from 'react'
import { toggleMark } from 'prosemirror-commands'
import StrongIcon from '../components/icons/bold'
import { Extension, ExtensionProps } from '../types'
import { markActive } from '../utils'

export default class Strong extends Extension {
  constructor(props?: ExtensionProps) {
    super(props);
  }

  get name() {
    return 'strong';
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
      parseDOM: [{ tag: 'strong' }, { style: 'font-weight=bold' }],
      toDOM: () => [
        'strong',
        {
          style: 'font-weight:bold'
        }
      ]
    }
  }

  get icon() {
    return <StrongIcon style={{ width: '24px', height: '24px' }} />
  }

  active(state) {
    return markActive(state.schema.marks.strong)(state);
  }

  onClick(state, dispatch) {
    toggleMark(state.schema.marks.strong)(state, dispatch);
  }
}
