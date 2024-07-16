import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import { Plugin, PluginView, EditorState } from 'prosemirror-state';
// import { render, unmountComponentAtNode } from 'react-dom';
import TooltipReact from './tooltip-react';
import { render, unmount } from '../../utils/react';
import { getMarkInSelection, getScrollTop } from '../../utils';

const { useRef } = React
const ARROWOFFSET = 50
const ARROWTOPOFFSET = 30

const calculateStyle = (
  view: EditorView
) => {
  const { selection } = view.state;
  const app = view.dom;
  const link = getMarkInSelection('link', view.state);

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
  const link = getMarkInSelection('link', view.state);

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
  const link = getMarkInSelection('link', view.state)
  let editing = false;
  let url = '';
  if (link) {
    url = link.attrs.href;
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

// const tooltipView: PluginView = {
//   update(view: EditorView, prevState: EditorState) {
//     render(<TooltipComponent view={view} />, this.tooltip);
//   },
//   destroy() {
//     unmountComponentAtNode(this.tooltip);
//     document.body.removeChild(this.tooltip);
//   }
// }

class Tooltip implements PluginView {
  tooltip: HTMLDivElement

  constructor(view: EditorView) {
    this.tooltip = document.createElement('div');
    document.body.appendChild(this.tooltip);
  }

  // @ts-ignore
  update(view: EditorView, prevState: EditorState) {
    render(<TooltipComponent view={view} />, this.tooltip);
  }

  destroy() {
    unmount(this.tooltip);
    document.body.removeChild(this.tooltip);
  }
}

export default () => {
  return new Plugin({
    // @ts-ignore
    view(view: EditorView) {
      return new Tooltip(view);
    }
  });
}
