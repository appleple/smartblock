import { toggleMark } from 'prosemirror-commands'
import { Extension, ExtensionProps } from '../types'
import { markActive, getUniqId } from '../utils'

export default class CustomMark extends Extension {
  constructor(props?: ExtensionProps) {
    if (!props.customName) {
      props.customName = getUniqId();
    }
    super(props);
  }
  get name() {
    return this.customName
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
    return markActive(state.schema.marks[this.name])(state)
  }

  onClick(state, dispatch) {
    toggleMark(state.schema.marks[this.name])(state, dispatch)
  }
}
