import * as React from 'react';
import LinkIcon from '../../components/icons/Link';
import { toggleMark } from 'prosemirror-commands';
import { Extension } from '../../types';
import { markActive } from '../../utils';
import tooltip from './tooltip';

export default class Link implements Extension {
  get name() {
    return 'link';
  }
  get group() {
    return "mark"
  }
  get showMenu() {
    return true;
  }
  get schema() {
    return {
      group: 'mark',
      attrs: {
        href: {},
        title: {default: null}
      },
      inclusive: false,
      parseDOM: [{tag: "a[href]", getAttrs(dom) {
        return {href: dom.getAttribute("href"), title: dom.getAttribute("title")}
      }}],
      toDOM(node) { let {href, title} = node.attrs; return ["a", {href, title}, 0] }
    }
  }
  get icon() {
    return <LinkIcon style={{ width: '24px', height: '24px' }} />
  }
  get plugins() {
    return [
      tooltip()
    ]
  }
  active (state) {
    return markActive(state.schema.marks.link)(state);
  }
  onClick (state, dispatch) {
    if (markActive(state.schema.marks.link)(state)) {
      toggleMark(state.schema.marks.link)(state, dispatch)
      return true
    }

    toggleMark(state.schema.marks.link, { href: '' })(state, dispatch)
  }
}