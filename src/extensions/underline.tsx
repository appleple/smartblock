import * as React from 'react'
import { toggleMark } from 'prosemirror-commands'
import UnderlineIcon from '../components/icons/Underline'
import { Extension, ExtensionSchema } from '../types'
import { markActive } from '../utils'

export default class Underline extends Extension {
  constructor(schema?: ExtensionSchema) {
    super();
    this.customSchema = schema;
  }
  get name() {
    return 'underline'
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
      parseDOM: [{ tag: 'u' }, { style: 'text-decoration=underline' }],
      toDOM: () => [
        'span',
        {
          style: 'text-decoration:underline'
        }
      ]
    }
  }

  get icon() {
    return <UnderlineIcon style={{ width: '24px', height: '24px' }} />
  }

  active(state) {
    return markActive(state.schema.marks.underline)(state)
  }

  onClick(state, dispatch) {
    toggleMark(state.schema.marks.underline)(state, dispatch)
  }
}
