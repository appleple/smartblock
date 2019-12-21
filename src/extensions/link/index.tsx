import * as React from 'react'
import { toggleMark } from 'prosemirror-commands'
import LinkIcon from '../../components/icons/Link'
import { Extension, ExtensionProps } from '../../types'
import { markActive, getMarkInSelection } from '../../utils'
import tooltip from './tooltip'

export default class Link extends Extension {
  constructor(props?: ExtensionProps) {
    super(props);
  }

  get name() {
    return 'link'
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
    const { className } = this;
    return {
      group: 'mark',
      attrs: {
        href: {},
        editing: { default: true },
        title: { default: null }
      },
      inclusive: false,
      parseDOM: [
        {
          tag: 'a[href]:not(.embed)',
          getAttrs(dom) {
            return {
              href: dom.getAttribute('href'),
              title: dom.getAttribute('title')
            }
          }
        }
      ],
      toDOM(node) {
        const { href, title } = node.attrs;
        return ['a', { href, title, class: className }, 0];
      }
    }
  }

  get icon() {
    return <LinkIcon style={{ width: '24px', height: '24px' }} />
  }

  get plugins() {
    return [tooltip()]
  }

  active(state) {
    return markActive(state.schema.marks.link)(state)
  }

  onClick(state, dispatch) {
    if (markActive(state.schema.marks.link)(state)) {
      const link = getMarkInSelection('link', state);
      const { selection } = state;
      const { $anchor } = selection;
      const { nodeBefore, nodeAfter, pos } = $anchor;
      let beforePos = selection.from;
      let afterPos = selection.to;
      if (beforePos === afterPos && nodeBefore && nodeAfter) {
        beforePos = pos - nodeBefore.nodeSize;
        afterPos = pos + nodeAfter.nodeSize;
      }
      const { tr } = state;
      tr.removeMark(beforePos, afterPos, state.schema.marks.link);
      tr.addMark(
        beforePos,
        afterPos,
        state.schema.marks.link.create({ href: link.attrs.href, editing: true })
      )
      // dispatch
      dispatch(tr.scrollIntoView());
      return true;
    }

    toggleMark(state.schema.marks.link, { href: '', editing: true })(
      state,
      dispatch
    )
  }
}
