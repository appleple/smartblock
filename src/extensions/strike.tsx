import * as React from 'react'
import { toggleMark } from 'prosemirror-commands'
import StrikeIcon from '../components/icons/Strike'
import { Extension, ExtensionSchema } from '../types'
import { markActive } from '../utils'

export default class StrikeThrough extends Extension {
  constructor(schema?: ExtensionSchema) {
    super();
    this.customSchema = schema;
  }
  get name() {
    return 'strike'
  }

  get group() {
    return 'mark'
  }

  get showMenu() {
    return true
  }

  get schema() {
    if (this.customSchema) {
      return this.customSchema;
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
          style: 'text-decoration-line:line-through'
        }
      ]
    }
  }

  get icon() {
    return <StrikeIcon style={{ width: '24px', height: '24px' }} />
  }

  active(state) {
    return markActive(state.schema.marks.strike)(state)
  }

  onClick(state, dispatch) {
    toggleMark(state.schema.marks.strike)(state, dispatch)
  }
}
