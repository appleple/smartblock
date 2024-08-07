import * as React from 'react'
import { toggleMark } from 'prosemirror-commands'
import LinkIcon from '../../components/icons/link'
import { Dispatch, Extension, ExtensionProps } from '../../types'
import { markActive, getMarkInSelection } from '../../utils'
import { EditorState } from 'prosemirror-state'
import { Node } from 'prosemirror-model'

export default class Link extends Extension {
  constructor(props?: ExtensionProps) {
    super(props);
  }

  // @ts-ignore
  get name() {
    return 'link'
  }

  // @ts-ignore
  get group() {
    return 'mark'
  }

  // @ts-ignore
  get showMenu() {
    return true
  }

  // @ts-ignore
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
          getAttrs(dom: HTMLElement) {
            return {
              href: dom.getAttribute('href'),
              title: dom.getAttribute('title')
            }
          }
        }
      ],
      toDOM(node: Node) {
        const { href, title } = node.attrs;
        return ['a', { href, title, class: className }, 0];
      }
    }
  }

  // @ts-ignore
  get icon() {
    return <LinkIcon style={{ width: '24px', height: '24px' }} />
  }

  active(state: EditorState) {
    return markActive(state.schema.marks.link)(state)
  }

  onClick(state: EditorState, dispatch: Dispatch) {
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
        state.schema.marks.link.create({ href: link?.attrs?.href, editing: true })
      )
      // dispatch
      dispatch(tr.scrollIntoView());
      return;
    }

    toggleMark(state.schema.marks.link, { href: '', editing: true })(
      state,
      dispatch
    )
  }
}
