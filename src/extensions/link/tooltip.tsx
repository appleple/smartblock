import * as React from 'react';
import { EditorView } from "prosemirror-view";
import { EditorState, Plugin } from "prosemirror-state";
import { render, unmountComponentAtNode } from "react-dom";
import TooltipReact from './tooltip-react';
import { getOffset } from '../../utils';

const calculateStyle = (view: EditorView) => {
  const { selection } = view.state
  const app = view.dom;
  const dom = view.domAtPos(selection.$anchor.pos);
  const { $anchor } = view.state.selection;
  const { nodeAfter } = $anchor;
  let link = null;

  if (nodeAfter) {
    link = nodeAfter.marks.find((mark) => {
      if (mark.type.name === 'link') {
        return true;
      }
    });
  }

  if (!selection || selection.empty　|| !app || !link)  {
    return {
      left: -1000,
      top: 0
    }
  }
  
  const flag = dom.node instanceof Element;
  const element = flag ? dom.node as HTMLElement : dom.node.parentElement;
  const elementTop = getOffset(element).top;
  const coords = view.coordsAtPos(selection.$anchor.pos);

  if (window.innerWidth <= 767) {
    return {
      left: 5,
      top: elementTop + element.offsetHeight + 10
    }
  } 

  return {
    left: coords.left,
    top: elementTop + element.offsetHeight + 10
  }
}


class Tooltip {
  tooltip: HTMLDivElement;

  constructor(view: EditorView) {
    this.tooltip = document.createElement('div');
    document.body.appendChild(this.tooltip);
    this.update(view, null);
  }

  render(view: EditorView) {
    const style = calculateStyle(view);
    const { selection} = view.state;
    const { $anchor } = selection;
    const { nodeBefore, nodeAfter, pos } = $anchor;
    let link = null;
    let editing = false;
    if (nodeAfter) {
      link = nodeAfter.marks.find((mark) => {
        if (mark.type.name === 'link') {
          return true;
        }
      });
    }
    let url = '';
    if (link) {
      url = link.attrs.href;
    }
    if (link) {
      editing = link.attrs.editing;
    }
    let beforePos = selection.from;
    let afterPos = selection.to;
    if (beforePos === afterPos && nodeBefore && nodeAfter) {
      beforePos = pos - nodeBefore.nodeSize;
      afterPos = pos + nodeAfter.nodeSize;
    }
    render(<TooltipReact 
      style={style} 
      url={url} 
      editing={editing}
      onClick={(href) => {
        const { tr } = view.state;
        tr.removeMark(beforePos, afterPos, view.state.schema.marks.link);
        if (!href) {
          view.dispatch(tr);
          return;
        }
        tr.addMark(
          beforePos, 
          afterPos, 
          view.state.schema.marks.link.create({ href, editing: false }
        ));
        view.dispatch(tr);
      }} 
    />, this.tooltip);
  }

  update(view: EditorView, oldState: EditorState) {
    this.render(view);
  }

  destroy() {
    unmountComponentAtNode(this.tooltip);
    this.tooltip.remove();
  }
}

export default () => {
  return new Plugin({
    view(view) {
      return new Tooltip(view);
    }
  })
}