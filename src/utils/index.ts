import { findChildren } from 'prosemirror-utils';
import { EditorState } from 'prosemirror-state';
import { Node } from 'prosemirror-model';
import { wrapInList, liftListItem } from 'prosemirror-schema-list'
import { findParentNode } from 'prosemirror-utils'

export const getScrollTop = () => {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

export const getScrollLeft = () => {
  return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
}

export const getOffset = el => {
  const rect = el.getBoundingClientRect();
  return {
    top: rect.top + getScrollTop(),
    left: rect.left + getScrollLeft()
  }
}

export const getViewport = () => {
  if (window.visualViewport && /Android/.test(navigator.userAgent)) {
    // https://developers.google.com/web/updates/2017/09/visual-viewport-api    Note on desktop Chrome the viewport subtracts scrollbar widths so is not same as window.innerWidth/innerHeight
    return {
      left: window.visualViewport.pageLeft,
      top: window.visualViewport.pageTop,
      width: window.visualViewport.width,
      height: window.visualViewport.height
    };
  }
  const viewport = {
    left: window.pageXOffset,   // http://www.quirksmode.org/mobile/tableViewport.html
    top: window.pageYOffset,
    width: window.innerWidth || window.documentElement.clientWidth,
    height: window.innerHeight || window.documentElement.clientHeight
  };
  if (/iPod|iPhone|iPad/.test(navigator.platform) && isInput(document.activeElement as HTMLElement)) {       // iOS *lies* about viewport size when keyboard is visible. See http://stackoverflow.com/questions/2593139/ipad-web-app-detect-virtual-keyboard-using-javascript-in-safari Input focus/blur can indicate, also scrollTop: 
    return {
      left: viewport.left,
      top: viewport.top,
      width: viewport.width,
      height: viewport.height * (viewport.height > viewport.width ? 0.66 : 0.45),  // Fudge factor to allow for keyboard on iPad
      keyboardHeight: viewport.height * (viewport.height > viewport.width ? 0.34 : 0.55) 
    };
  }
  return viewport;
}

export const isInput = (el: HTMLElement) => {
  return el.isContentEditable;
};

export const markActive = type => state => {
  const { from, $from, to, empty } = state.selection

  return empty
    ? type.isInSet(state.storedMarks || $from.marks())
    : state.doc.rangeHasMark(from, to, type)
}

export const blockActive = (type) => state => {
  const { selection } = state;
  const { $from, to } = state.selection
  const { $anchor } = selection;
  const resolvedPos = state.doc.resolve($anchor.pos) as any;
  const rowNumber = resolvedPos.path[1];
  let i = 0;
  const [ firstNode ] = findChildren(state.doc, (_node) => {
    if (rowNumber === i) {
      return true;
    }
    i++;
    return false;
  }, false);

  if (!firstNode) {
    return false;
  }

  return to <= $from.end() && firstNode.node.type.name === type.name
}

export const canInsert = type => state => {
  const { $from } = state.selection
  for (let d = $from.depth; d >= 0; d--) {
    const index = $from.index(d)

    if ($from.node(d).canReplaceWith(index, index, type)) {
      return true
    }
  }
  return false
}

export const findNodePosition = (doc: Node, target: Node) => {
  let ret = -1;
  doc.descendants((node, pos) => {
    if (node.eq(target)) {
      ret = pos;
    }
  });
  return ret;
}

export const getParentNodePosFromState = (state: EditorState) => {
  const { selection } = state;
  const { $anchor } = selection;
  const resolvedPos = state.doc.resolve($anchor.pos) as any;
  const rowNumber = resolvedPos.path[1] as number;
  let i = 0;
  const [ firstNode ] = findChildren(state.doc, (_node) => {
    if (rowNumber === i || rowNumber + 1 === i) {
      i++;
      return true;
    }
    i++;
    return false;
  }, false);
  const { node } = firstNode;
  const pos = findNodePosition(state.doc, node);
  return pos + node.nodeSize;
}

function isList(node, schema) {
  return (node.type === schema.nodes.bullet_list
    || node.type === schema.nodes.ordered_list);
}

export const toggleList = (listType, itemType) => {
  return (state, dispatch) => {
    const { schema, selection } = state
    const { $from, $to } = selection
    const range = $from.blockRange($to)

    if (!range) {
      return false
		}

    const parentList = findParentNode(node => isList(node, schema))(selection)

    if (range.depth >= 1 && parentList && range.depth - parentList.depth <= 1) {
      if (parentList.node.type === listType) {
        return liftListItem(itemType)(state, dispatch)
      }

      if (isList(parentList.node, schema) && listType.validContent(parentList.node.content)) {
        const { tr } = state
        tr.setNodeMarkup(parentList.pos, listType)

        if (dispatch) {
          dispatch(tr)
        }

        return false
      }
    }

    return wrapInList(listType)(state, dispatch)
  }
}