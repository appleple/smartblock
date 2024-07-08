import { toggleMark } from 'prosemirror-commands';
import { Extension, ExtensionProps } from '../types';
import { markActive, getUniqId } from '../utils';
import { CUSTOM_MARK_PRIORITY } from '../constants';

export default class CustomMark extends Extension {
  constructor(props?: ExtensionProps) {
    if (!props.customName) {
      props.customName = getUniqId();
    }
    super(props);
  }

  // @ts-ignore
  get name() {
    return this.customName;
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
    const { className, tagName } = this;
    let tag = tagName;
    if (className) {
      tag += `.${className.replace(/\s/g, '.')}`;
    }

    return {
      group: 'mark',
      parseDOM: [
        {
          tag,
          priority: CUSTOM_MARK_PRIORITY,
        },
      ],
      toDOM: () => [
        tagName,
        {
          class: className,
        },
        0,
      ],
    };
  }

  // @ts-ignore
  get icon() {
    return this.customIcon;
  }

  active(state) {
    return markActive(state.schema.marks[this.name])(state);
  }

  onClick(state, dispatch) {
    toggleMark(state.schema.marks[this.name])(state, dispatch);
  }
}
