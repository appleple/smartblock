import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import { Plugin } from 'prosemirror-state';
import { render, unmountComponentAtNode } from 'react-dom';
import TooltipReact from './tooltip-react';
import { getScrollTop } from '../../utils';

const { useRef } = React
const ARROWOFFSET = 50
const ARROWTOPOFFSET = 30

const calculateStyle = (
  view: EditorView
) => {
  const { selection } = view.state;
  const app = view.dom;
  const { $anchor } = view.state.selection;
  const { nodeAfter } = $anchor;
  let link = null;

  if (nodeAfter) {
    link = nodeAfter.marks.find(mark => {
      if (mark.type.name === 'link') {
        return true;
      }
    })
  }

  if (!selection || selection.empty || !app || !link) {
    return {
      left: -1000,
      top: 0
    }
  }

  const coords = view.coordsAtPos(selection.$head.pos);
  const top = coords.top + getScrollTop() + ARROWTOPOFFSET;
  const left = coords.left - ARROWOFFSET;

  const width = 320; // container.current.offsetWidth
  if (left + width > window.innerWidth) {
    return {
      top,
      left: window.innerWidth - width
    }
  }

  return {
    left,
    top
  }
}

const calculatePos = (
  view: EditorView
) => {
  const { selection } = view.state;
  const app = view.dom;
  const { $anchor } = view.state.selection;
  const { nodeAfter } = $anchor;
  let link = null;

  if (nodeAfter) {
    link = nodeAfter.marks.find(mark => {
      if (mark.type.name === 'link') {
        return true;
      }
      return false;
    })
  }

  if (!selection || selection.empty || !app || !link) {
    return 20;
  }

  const coords = view.coordsAtPos(selection.$head.pos);
  const left = coords.left - ARROWOFFSET;

  const width = 320; // container.current.offsetWidth
  if (left + width > window.innerWidth) {
    return left - window.innerWidth + width;
  }

  return 20;
}

const TooltipComponent = (props: { view: EditorView }) => {
  const { view } = props;
  const container = useRef<HTMLDivElement>(null);
  const style = calculateStyle(view);
  const { selection } = view.state;
  const { $anchor } = selection;
  const { nodeBefore, nodeAfter, pos } = $anchor;
  let link = null;
  let editing = false;
  if (nodeAfter) {
    link = nodeAfter.marks.find(mark => {
      if (mark.type.name === 'link') {
        return true;
      }
    })
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
  const arrowPos = calculatePos(view);

  return (
    <div
      className="smartblock-tooltip-wrap"
      ref={container}
      style={style}
    >
      <div
        className="smartblock-tooltip-arrow"
        style={{ left: `${arrowPos}px` }}
      ></div>
      <TooltipReact
        url={url}
        editing={editing}
        onClick={href => {
          const { tr } = view.state;
          tr.removeMark(beforePos, afterPos, view.state.schema.marks.link);
          if (!href) {
            view.dispatch(tr);
            return;
          }
          tr.addMark(
            beforePos,
            afterPos,
            view.state.schema.marks.link.create({ href, editing: false })
          );
          view.dispatch(tr);
        }}
      />
    </div>
  )
}

class Tooltip {
  tooltip: HTMLDivElement

  constructor(view: EditorView) {
    this.tooltip = document.createElement('div');
    document.body.appendChild(this.tooltip);
    this.update(view);
  }

  render(view: EditorView) {
    render(<TooltipComponent view={view} />, this.tooltip);
  }

  update(view: EditorView) {
    this.render(view);
  }

  destroy() {
    unmountComponentAtNode(this.tooltip);
    document.body.removeChild(this.tooltip);
  }
}

export default () => {
  return new Plugin({
    // @ts-ignore
    view(view) {
      // @ts-ignore
      return new Tooltip(view);
    }
  });
}
