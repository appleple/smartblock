import * as React from 'react'
import { toggleMark } from 'prosemirror-commands'
import StrikeIcon from '../components/icons/strike'
import { Extension, ExtensionProps } from '../types'
import { markActive } from '../utils'

export default class StrikeThrough extends Extension {
  constructor(props?: ExtensionProps) {
    super(props);
  }

  get name() {
    return 'strike';
  }

  get group() {
    return 'mark';
  }

  get showMenu() {
    return true;
  }

  get schema() {
    if (this.customSchema) {
      return this.customSchema
    }
    return {
      group: 'mark',
      parseDOM: [
        { tag: 'strike' },
        { style: 'text-decoration=line-through' },
        { style: 'text-decoration-line=line-through' }
      ],
      toDOM: () => [
        'span',
        {
          style: 'text-decoration-line:line-through',
          class: this.className
        }
      ]
    }
  }

  get icon() {
    return <StrikeIcon style={{ width: '24px', height: '24px' }} />
  }

  active(state) {
    return markActive(state.schema.marks.strike)(state);
  }

  onClick(state, dispatch) {
    toggleMark(state.schema.marks.strike)(state, dispatch);
  }
}
