import * as React from 'react';
import CheckIcon from '../components/icons/check';
import { EditorView } from 'prosemirror-view';
import { getMarkInSelection, getScrollTop } from '../utils';
import { createPortal } from 'react-dom';

type LinkMenuProps = {
  view: EditorView;
};

const ARROWOFFSET = 50;
const ARROWTOPOFFSET = 30;

const calculateStyle = (view: EditorView) => {
  const { selection } = view.state;
  const app = view.dom;
  const link = getMarkInSelection('link', view.state);

  if (!selection || selection.empty || !app || !link) {
    return {
      left: -1000,
      top: 0,
    };
  }

  const isSelectionToLeft = selection.$head.pos < selection.$anchor.pos;
  const coords = view.coordsAtPos(selection.$head.pos, isSelectionToLeft ? 0 : -1);
  const top = coords.top + getScrollTop() + ARROWTOPOFFSET;
  const left = coords.left - ARROWOFFSET;

  const width = 320; // container.current.offsetWidth
  if (left + width > window.innerWidth) {
    return {
      top,
      left: window.innerWidth - width,
    };
  }

  return {
    left,
    top,
  };
};

const calculatePos = (view: EditorView) => {
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
};

export default function LinkMenu({ view }: LinkMenuProps) {
  const containerRef = React.useRef<HTMLDivElement>(document.createElement('div'));
  const style = calculateStyle(view);
  const { selection } = view.state;
  const { $anchor } = selection;
  const { nodeBefore, nodeAfter, pos } = $anchor;
  const link = getMarkInSelection('link', view.state);
  let beforePos = selection.from;
  let afterPos = selection.to;
  if (beforePos === afterPos && nodeBefore && nodeAfter) {
    beforePos = pos - nodeBefore.nodeSize;
    afterPos = pos + nodeAfter.nodeSize;
  }
  const arrowPos = calculatePos(view);

  React.useEffect(() => {
    const container = containerRef.current;
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, []);

  const [url, setUrl] = React.useState(link ? link.attrs.href : '');

  const shouldShow = React.useMemo(() => {
    if (!link) {
      return false;
    }
    return link.attrs.editing;
  }, [link]);

  const editLink = React.useCallback(
    (href: string) => {
      const { tr } = view.state;
      tr.removeMark(beforePos, afterPos, view.state.schema.marks.link);
      if (!href) {
        view.dispatch(tr);
        return;
      }
      tr.addMark(beforePos, afterPos, view.state.schema.marks.link.create({ href, editing: false }));
      view.dispatch(tr);
    },
    [view, afterPos, beforePos]
  );

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      editLink(url);
    },
    [url, editLink]
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
        event.preventDefault();
        editLink(event.target.value);
      }
    },
    [editLink]
  );

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUrl(event.target.value);
    },
    [setUrl]
  );

  if (!shouldShow) {
    return null;
  }

  return createPortal(
    <div className="smartblock-tooltip-wrap" style={style}>
      <div className="smartblock-tooltip-arrow" style={{ left: `${arrowPos}px` }} />
      <div className="smartblock-tooltip">
        <div className="smartblock-tooltip-inner">
          <input
            className="smartblock-tooltip-input"
            type="text"
            value={url}
            placeholder="https://~"
            onKeyDown={handleKeyDown}
            onChange={handleChange}
          />
          <button
            type="button"
            className="smartblock-tooltip-btn"
            style={{ paddingLeft: '7px' }}
            onClick={handleClick}
          >
            <CheckIcon style={{ width: '24px', height: '24px', overflow: 'hidden' }} />
          </button>
        </div>
      </div>
    </div>,
    containerRef.current
  );
}
