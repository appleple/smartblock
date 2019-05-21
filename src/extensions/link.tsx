import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/fontawesome-free-solid'
import { toggleMark } from 'prosemirror-commands';
import { Extension } from '../types';
import { markActive } from '../utils';

const promptForURL = () => {
  let url = window && window.prompt('Enter the URL', 'https://')

  if (url && !/^https?:\/\//i.test(url)) {
    url = 'http://' + url
  }

  return url
}

export default class Link implements Extension {
  get name() {
    return 'link';
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
    return <FontAwesomeIcon icon={faLink} />
  }
  active (state) {
    return markActive(state.schema.marks.link)(state);
  }
  onClick (state, dispatch) {
    if (markActive(state.schema.marks.link)(state)) {
      toggleMark(state.schema.marks.link)(state, dispatch)
      return true
    }
    const href = promptForURL()
    if (!href) {
      return false
    }
    toggleMark(state.schema.marks.link, { href })(state, dispatch)
  }
}