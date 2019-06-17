import { findChildren } from 'prosemirror-utils';
import { Slice, Fragment, NodeRange } from 'prosemirror-model';
import { liftTarget, ReplaceAroundStep } from 'prosemirror-transform';
export var getScrollTop = function () {
    return (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0);
};
export var getScrollLeft = function () {
    return (window.pageXOffset ||
        document.documentElement.scrollLeft ||
        document.body.scrollLeft ||
        0);
};
export var getOffset = function (el) {
    var rect = el.getBoundingClientRect();
    return {
        top: rect.top + getScrollTop(),
        left: rect.left + getScrollLeft()
    };
};
export var getViewport = function () {
    if (window.visualViewport && /Android/.test(navigator.userAgent)) {
        // https://developers.google.com/web/updates/2017/09/visual-viewport-api    Note on desktop Chrome the viewport subtracts scrollbar widths so is not same as window.innerWidth/innerHeight
        return {
            left: window.visualViewport.pageLeft,
            top: window.visualViewport.pageTop,
            width: window.visualViewport.width,
            height: window.visualViewport.height
        };
    }
    var viewport = {
        left: window.pageXOffset,
        top: window.pageYOffset,
        width: window.innerWidth || window.documentElement.clientWidth,
        height: window.innerHeight || window.documentElement.clientHeight
    };
    if (/iPod|iPhone|iPad/.test(navigator.platform) &&
        isInput(document.activeElement)) {
        // iOS *lies* about viewport size when keyboard is visible. See http://stackoverflow.com/questions/2593139/ipad-web-app-detect-virtual-keyboard-using-javascript-in-safari Input focus/blur can indicate, also scrollTop:
        return {
            left: viewport.left,
            top: viewport.top,
            width: viewport.width,
            height: viewport.height * (viewport.height > viewport.width ? 0.66 : 0.45),
            keyboardHeight: viewport.height * (viewport.height > viewport.width ? 0.34 : 0.55)
        };
    }
    return viewport;
};
export var isInput = function (el) {
    return el.isContentEditable;
};
export var markActive = function (type) { return function (state) {
    var _a = state.selection, from = _a.from, $from = _a.$from, to = _a.to, empty = _a.empty;
    return empty
        ? type.isInSet(state.storedMarks || $from.marks())
        : state.doc.rangeHasMark(from, to, type);
}; };
export var getMarkInSelection = function (markName, state) {
    var selection = state.selection;
    var $anchor = selection.$anchor;
    var nodeAfter = $anchor.nodeAfter;
    if (nodeAfter) {
        return nodeAfter.marks.find(function (mark) {
            if (mark.type.name === markName) {
                return true;
            }
        });
    }
    return null;
};
export var blockActive = function (type) { return function (state) {
    var selection = state.selection;
    var _a = state.selection, $from = _a.$from, to = _a.to;
    var $anchor = selection.$anchor;
    var resolvedPos = state.doc.resolve($anchor.pos);
    var rowNumber = resolvedPos.path[1];
    var i = 0;
    var firstNode = findChildren(state.doc, function () {
        if (rowNumber === i) {
            return true;
        }
        i++;
        return false;
    }, false)[0];
    if (!firstNode) {
        return false;
    }
    return to <= $from.end() && firstNode.node.type.name === type.name;
}; };
export var canInsert = function (type) { return function (state) {
    var $from = state.selection.$from;
    for (var d = $from.depth; d >= 0; d--) {
        var index = $from.index(d);
        if ($from.node(d).canReplaceWith(index, index, type)) {
            return true;
        }
    }
    return false;
}; };
export var findNodePosition = function (doc, target) {
    var ret = -1;
    doc.descendants(function (node, pos) {
        if (node.eq(target)) {
            ret = pos;
        }
    });
    return ret;
};
export var getParentNodeFromState = function (state) {
    var selection = state.selection;
    var $anchor = selection.$anchor;
    var resolvedPos = state.doc.resolve($anchor.pos);
    var rowNumber = resolvedPos.path[1];
    var i = 0;
    var firstNode = findChildren(state.doc, function () {
        if (rowNumber === i || rowNumber + 1 === i) {
            i++;
            return true;
        }
        i++;
        return false;
    }, false)[0];
    var node = firstNode.node;
    return node;
};
export var getParentNodePosFromState = function (state) {
    var node = getParentNodeFromState(state);
    var pos = findNodePosition(state.doc, node);
    return pos + node.nodeSize;
};
export var findSelectedNodeWithType = function (nodeType, state) {
    var _a = state.selection, from = _a.from, to = _a.to;
    var applicable = false;
    var applicableNode = null;
    state.doc.nodesBetween(from, to, function (node) {
        if (applicable)
            return false;
        if (node.type == nodeType) {
            applicableNode = node;
        }
    });
    return applicableNode;
};
function liftToOuterList(state, dispatch, itemType, range) {
    var tr = state.tr;
    var end = range.end;
    var endOfList = range.$to.end(range.depth);
    if (end < endOfList) {
        tr.step(new ReplaceAroundStep(end - 1, endOfList, end, endOfList, new Slice(Fragment.from(itemType.create(null, range.parent.copy())), 1, 0), 1, true));
        range = new NodeRange(tr.doc.resolve(range.$from.pos), tr.doc.resolve(endOfList), range.depth);
    }
    dispatch(tr.lift(range, liftTarget(range) - 1).scrollIntoView());
    return true;
}
function liftOutOfList(state, dispatch, range) {
    var tr = state.tr;
    var list = range.parent;
    // Merge the list items into a single big item
    for (var pos = range.end, i = range.endIndex - 1, e = range.startIndex; i > e; i--) {
        pos -= list.child(i).nodeSize;
        tr.delete(pos - 1, pos + 1);
    }
    var $start = tr.doc.resolve(range.start);
    var item = $start.nodeAfter;
    var atStart = range.startIndex == 0;
    var atEnd = range.endIndex == list.childCount;
    var parent = $start.node(-1);
    var indexBefore = $start.index(-1);
    if (!parent.canReplace(indexBefore + (atStart ? 0 : 1), indexBefore + 1, item.content.append(atEnd ? Fragment.empty : Fragment.from(list))))
        return false;
    var start = $start.pos;
    var end = start + item.nodeSize;
    tr.step(new ReplaceAroundStep(start - (atStart ? 1 : 0), end + (atEnd ? 1 : 0), start + 1, end - 1, new Slice((atStart
        ? Fragment.empty
        : Fragment.from(list.copy(Fragment.empty))).append(atEnd ? Fragment.empty : Fragment.from(list.copy(Fragment.empty))), atStart ? 0 : 1, atEnd ? 0 : 1), atStart ? 0 : 1));
    dispatch(tr.scrollIntoView());
    return true;
}
export var liftListItem = function (itemType) {
    return function (state, dispatch) {
        var _a = state.selection, $from = _a.$from, $to = _a.$to;
        var range = $from.blockRange($to, function (node) { return node.childCount && node.firstChild.type == itemType; });
        if (!range)
            return false;
        if (!dispatch)
            return true;
        if ($from.node(range.depth - 1).type == itemType) {
            return liftToOuterList(state, dispatch, itemType, range);
        }
        return liftOutOfList(state, dispatch, range);
    };
};
var tableNodeTypes = function (schema) {
    if (schema.cached.tableNodeTypes) {
        return schema.cached.tableNodeTypes;
    }
    var roles = {};
    Object.keys(schema.nodes).forEach(function (type) {
        var nodeType = schema.nodes[type];
        if (nodeType.spec.tableRole) {
            roles[nodeType.spec.tableRole] = nodeType;
        }
    });
    schema.cached.tableNodeTypes = roles;
    return roles;
};
var createCell = function (cellType, cellContent) {
    if (cellContent === void 0) { cellContent = null; }
    if (cellContent) {
        return cellType.createChecked(null, cellContent);
    }
    return cellType.createAndFill();
};
export var createTable = function (schema, attrs, rowsCount, colsCount, withHeaderRow, cellContent) {
    if (rowsCount === void 0) { rowsCount = 3; }
    if (colsCount === void 0) { colsCount = 3; }
    if (withHeaderRow === void 0) { withHeaderRow = true; }
    if (cellContent === void 0) { cellContent = null; }
    var _a = tableNodeTypes(schema), tableCell = _a.cell, tableHeader = _a.header_cell, tableRow = _a.row, table = _a.table;
    var cells = [];
    var headerCells = [];
    for (var i = 0; i < colsCount; i++) {
        cells.push(createCell(tableCell, cellContent));
        if (withHeaderRow) {
            headerCells.push(createCell(tableHeader, cellContent));
        }
    }
    var rows = [];
    for (var i = 0; i < rowsCount; i++) {
        rows.push(tableRow.createChecked(null, withHeaderRow && i === 0 ? headerCells : cells));
    }
    return table.createChecked(attrs, rows);
};
export var calculateStyle = function (view, offset) {
    if (offset === void 0) { offset = { top: 0, left: 0 }; }
    var selection = view.state.selection;
    var dom = view.domAtPos(selection.$anchor.pos);
    var flag = dom.node instanceof Element;
    var element = flag ? dom.node : dom.node.parentElement;
    var elementTop = getOffset(element).top;
    var coords = view.coordsAtPos(selection.$anchor.pos);
    var offsetTop = getOffset(view.dom).top;
    if (window.innerWidth <= 767) {
        return {
            left: offset.left,
            top: elementTop - offsetTop + offset.top
        };
    }
    return {
        left: coords.left + offset.left,
        top: elementTop - offsetTop + offset.top
    };
};
export var isDescendant = function (parent, child) {
    var node = child.parentNode;
    while (node != null) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
};
export var stripPtag = function (html) {
    return html.replace(/<li (.*?)><p (.*?)>(.*?)<\/p><\/li>/g, '<li $1>$3</li>');
};
//# sourceMappingURL=index.js.map