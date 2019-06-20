import * as React from 'react'
import { toggleMark } from 'prosemirror-commands'
import EmIcon from '../components/icons/Em'
import { Extension, ExtensionSchema } from '../types'
import { markActive } from '../utils'

export default class Strong extends Extension {
  constructor(schema?: ExtensionSchema) {
    super();
    this.customSchema = schema;
  }
  get name() {
    return 'em'
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
      parseDOM: [{ tag: 'em' }, { style: 'font-style=italic' }],
      toDOM: () => [
        'span',
        {
          style: 'font-style:italic'
        }
      ]
    }
  }

  get icon() {
    return <EmIcon style={{ width: '24px', height: '24px' }} />
  }

  active(state) {
    return markActive(state.schema.marks.em)(state)
  }

  onClick(state, dispatch) {
    toggleMark(state.schema.marks.em)(state, dispatch)
  }
}
