import { findChildren } from 'prosemirror-utils'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { Node, Slice, Fragment, NodeRange, DOMSerializer, Schema } from 'prosemirror-model'
import { liftTarget, ReplaceAroundStep } from 'prosemirror-transform'
import { Dispatch } from '../types';

export const getScrollTop = () => {
  return (
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  )
}

export const getScrollLeft = () => {
  return (
    window.pageXOffset ||
    document.documentElement.scrollLeft ||
    document.body.scrollLeft ||
    0
  )
}

export const getOffset = el => {
  const rect = el.getBoundingClientRect()
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
    }
  }
  const viewport = {
    left: window.pageXOffset, // http://www.quirksmode.org/mobile/tableViewport.html
    top: window.pageYOffset,
    width: window.innerWidth || window.documentElement.clientWidth,
    height: window.innerHeight || window.documentElement.clientHeight
  }
  if (
    /iPod|iPhone|iPad/.test(navigator.platform) &&
    isInput(document.activeElement as HTMLElement)
  ) {
    // iOS *lies* about viewport size when keyboard is visible. See http://stackoverflow.com/questions/2593139/ipad-web-app-detect-virtual-keyboard-using-javascript-in-safari Input focus/blur can indicate, also scrollTop:
    return {
      left: viewport.left,
      top: viewport.top,
      width: viewport.width,
      height:
        viewport.height * (viewport.height > viewport.width ? 0.66 : 0.45), // Fudge factor to allow for keyboard on iPad
      keyboardHeight:
        viewport.height * (viewport.height > viewport.width ? 0.34 : 0.55)
    }
  }
  return viewport
}

export const isInput = (el: HTMLElement) => {
  return el.isContentEditable
}

export const markActive = type => state => {
  const { from, $from, to, empty } = state.selection

  return empty
    ? type.isInSet(state.storedMarks || $from.marks())
    : state.doc.rangeHasMark(from, to, type)
}

export const getMarkInSelection = (markName: string, state: EditorState) => {
  const { selection } = state
  const { $anchor } = selection
  const { nodeAfter } = $anchor
  if (nodeAfter) {
    return nodeAfter.marks.find(mark => {
      if (mark.type.name === markName) {
        return true
      }
    })
  }
  return null
}

export const blockActive = type => state => {
  const { selection } = state
  const { $from, to } = state.selection
  const { $anchor } = selection
  const resolvedPos = state.doc.resolve($anchor.pos) as any
  const rowNumber = resolvedPos.path[1]
  let i = 0
  const [firstNode] = findChildren(
    state.doc,
    () => {
      if (rowNumber === i) {
        return true
      }
      i++
      return false
    },
    false
  )

  if (!firstNode) {
    return false
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
  let ret = -1
  doc.descendants((node, pos) => {
    if (node.eq(target)) {
      ret = pos
    }
  })
  return ret
}

export const getRootNodeWithPosByIndex = (state: EditorState, index: number) => {
  let i = 0;
  const [firstNode] = findChildren(state.doc, () => {
    if (i === index) {
      i++;
      return true;
    }
    i++;
    return false;
  }, false);
  return firstNode;
}

export const getRootNodeCountFromState = (state: EditorState) => {
  return state.doc.content.childCount;
}

export const getParentNodeWithPosFromState = (state: EditorState) => {
  const { selection } = state
  const { $anchor } = selection
  const resolvedPos = state.doc.resolve($anchor.pos) as any
  const rowNumber = resolvedPos.path[1] as number
  let i = 0
  const [firstNode] = findChildren(
    state.doc,
    () => {
      if (rowNumber === i) {
        i++
        return true
      }
      i++
      return false
    },
    false
  )
  return firstNode;
}

export const getParentNodeIndexFromState = (state: EditorState) => {
  const { selection } = state
  const { $anchor } = selection
  const resolvedPos = state.doc.resolve($anchor.pos) as any
  const rowNumber = resolvedPos.path[1] as number
  return rowNumber;
}

export const getParentNodeFromState = (state: EditorState) => {
  const firstNode = getParentNodeWithPosFromState(state);
  const { node } = firstNode
  return node
}

export const getParentNodePosFromState = (state: EditorState) => {
  const node = getParentNodeFromState(state)
  const pos = findNodePosition(state.doc, node)
  return pos + node.nodeSize
}

export const findSelectedNodeWithType = (nodeType, state) => {
  const { from, to } = state.selection
  const applicable = false
  let applicableNode = null
  state.doc.nodesBetween(from, to, node => {
    if (applicable) return false
    if (node.type == nodeType) {
      applicableNode = node
    }
  })
  return applicableNode
}

function liftToOuterList(state, dispatch, itemType, range) {
  const { tr } = state
  const { end } = range
  const endOfList = range.$to.end(range.depth)
  if (end < endOfList) {
    tr.step(
      new ReplaceAroundStep(
        end - 1,
        endOfList,
        end,
        endOfList,
        new Slice(
          Fragment.from(itemType.create(null, range.parent.copy())),
          1,
          0
        ),
        1,
        true
      )
    )
    range = new NodeRange(
      tr.doc.resolve(range.$from.pos),
      tr.doc.resolve(endOfList),
      range.depth
    )
  }
  dispatch(tr.lift(range, liftTarget(range) - 1).scrollIntoView())
  return true
}

function liftOutOfList(state, dispatch, range) {
  const { tr } = state
  const list = range.parent
  // Merge the list items into a single big item
  for (
    let pos = range.end, i = range.endIndex - 1, e = range.startIndex;
    i > e;
    i--
  ) {
    pos -= list.child(i).nodeSize
    tr.delete(pos - 1, pos + 1)
  }
  const $start = tr.doc.resolve(range.start)
  const item = $start.nodeAfter
  const atStart = range.startIndex == 0
  const atEnd = range.endIndex == list.childCount
  const parent = $start.node(-1)
  const indexBefore = $start.index(-1)
  if (
    !parent.canReplace(
      indexBefore + (atStart ? 0 : 1),
      indexBefore + 1,
      item.content.append(atEnd ? Fragment.empty : Fragment.from(list))
    )
  )
    return false
  const start = $start.pos
  const end = start + item.nodeSize
  tr.step(
    new ReplaceAroundStep(
      start - (atStart ? 1 : 0),
      end + (atEnd ? 1 : 0),
      start + 1,
      end - 1,
      new Slice(
        (atStart
          ? Fragment.empty
          : Fragment.from(list.copy(Fragment.empty))
        ).append(
          atEnd ? Fragment.empty : Fragment.from(list.copy(Fragment.empty))
        ),
        atStart ? 0 : 1,
        atEnd ? 0 : 1
      ),
      atStart ? 0 : 1
    )
  )
  dispatch(tr.scrollIntoView())
  return true
}

export const liftListItem = itemType => {
  return function(state: EditorState, dispatch?: Dispatch) {
    const { $from, $to } = state.selection
    const range = $from.blockRange(
      $to,
      node => node.childCount && node.firstChild.type == itemType
    )
    if (!range) return false
    if (!dispatch) return true
    if ($from.node(range.depth - 1).type == itemType) {
      return liftToOuterList(state, dispatch, itemType, range)
    }
    return liftOutOfList(state, dispatch, range)
  }
}

const tableNodeTypes = schema => {
  if (schema.cached.tableNodeTypes) {
    return schema.cached.tableNodeTypes
  }
  const roles = {}
  Object.keys(schema.nodes).forEach(type => {
    const nodeType = schema.nodes[type]
    if (nodeType.spec.tableRole) {
      roles[nodeType.spec.tableRole] = nodeType
    }
  })
  schema.cached.tableNodeTypes = roles
  return roles
}

const createCell = (cellType, cellContent = null) => {
  if (cellContent) {
    return cellType.createChecked(null, cellContent)
  }

  return cellType.createAndFill()
}

export const createTable = (
  schema,
  attrs,
  rowsCount = 3,
  colsCount = 3,
  withHeaderRow = true,
  cellContent = null
) => {
  const {
    cell: tableCell,
    header_cell: tableHeader,
    row: tableRow,
    table
  } = tableNodeTypes(schema)

  const cells = []
  const headerCells = []
  for (let i = 0; i < colsCount; i++) {
    cells.push(createCell(tableCell, cellContent))

    if (withHeaderRow) {
      headerCells.push(createCell(tableHeader, cellContent))
    }
  }

  const rows = []
  for (let i = 0; i < rowsCount; i++) {
    rows.push(
      tableRow.createChecked(
        null,
        withHeaderRow && i === 0 ? headerCells : cells
      )
    )
  }

  return table.createChecked(attrs, rows)
}

export const calculateStyle = (
  view: EditorView,
  offset = { top: 0, left: 0 }
) => {
  const { selection } = view.state
  const dom = view.domAtPos(selection.$anchor.pos)
  const flag = dom.node instanceof Element
  const element = flag ? (dom.node as HTMLElement) : dom.node.parentElement
  const elementTop = getOffset(element).top
  const coords = view.coordsAtPos(selection.$anchor.pos)
  const offsetTop = getOffset(view.dom).top

  if (window.innerWidth <= 767) {
    return {
      left: offset.left,
      top: elementTop - offsetTop + offset.top
    }
  }

  return {
    left: coords.left + offset.left,
    top: elementTop - offsetTop + offset.top
  }
}

export const isDescendant = (parent: HTMLElement, child: HTMLElement) => {
  let node = child.parentNode;
  while (node != null) {
    if (node == parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

const unwrap = (el: HTMLElement) => {
  const parent = el.parentNode;
  while (el.firstChild) {
    parent.insertBefore(el.firstChild, el);
  }
  parent.removeChild(el);
}

export const stripPtag = (html: string) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  const ps = div.querySelectorAll('li > p');
  [].forEach.call(ps, (p: HTMLElement) => {
    unwrap(p);
  });
  return div.innerHTML;
}

export const getHtmlFromNode = (doc: Node, schema: Schema) => {
  const fragment = DOMSerializer.fromSchema(schema).serializeFragment(
    doc.content
  )
  const div = document.createElement('div')
  div.appendChild(fragment);
  return stripPtag(div.innerHTML)
}

export const getBrowser = () => {
  const ua = window.navigator.userAgent.toLowerCase();
  const ver = window.navigator.appVersion.toLowerCase();
  let name = 'unknown';

  if (ua.indexOf('msie') != -1) {
    if (ver.indexOf('msie 6.') != -1) {
      name = 'ie6';
    } else if (ver.indexOf('msie 7.') != -1) {
      name = 'ie7';
    } else if (ver.indexOf('msie 8.') != -1) {
      name = 'ie8';
    } else if (ver.indexOf('msie 9.') != -1) {
      name = 'ie9';
    } else if (ver.indexOf('msie 10.') != -1) {
      name = 'ie10';
    } else {
      name = 'ie';
    }
  } else if (ua.indexOf('trident/7') != -1) {
    name = 'ie11';
  } else if (ua.indexOf('edge') != -1) {
    name = 'edge';
  } else if (ua.indexOf('chrome') != -1) {
    name = 'chrome';
  } else if (ua.indexOf('safari') != -1) {
    name = 'safari';
  } else if (ua.indexOf('opera') != -1) {
    name = 'opera';
  } else if (ua.indexOf('firefox') != -1) {
    name = 'firefox';
  }
  return name;
}