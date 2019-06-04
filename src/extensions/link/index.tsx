import * as React from 'react';
import Icon from '../../components/icon';
import link from '../../assets/images/icons/link.svg';
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
    return <Icon src={link} width={24} height={24} />
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