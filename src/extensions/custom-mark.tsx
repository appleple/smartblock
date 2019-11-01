import { toggleMark } from 'prosemirror-commands'
import { Extension, ExtensionProps } from '../types'
import { markActive } from '../utils'

export default class CustomMark extends Extension {
  constructor(props?: ExtensionProps) {
    super(props);
  }
  get name() {
    return 'custom_mark'
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
    const tag = this.tagName;
    return {
      group: 'mark',
      parseDOM: [{ tag }],
      toDOM: () => [ tag, 0 ]
    }
  }

  get icon() {
    return this.customIcon
  }

  active(state) {
    return markActive(state.schema.marks.custom_mark)(state)
  }

  onClick(state, dispatch) {
    toggleMark(state.schema.marks.custom_mark)(state, dispatch)
  }
}
