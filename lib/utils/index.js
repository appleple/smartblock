"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_utils_1 = require("prosemirror-utils");
var prosemirror_model_1 = require("prosemirror-model");
var prosemirror_transform_1 = require("prosemirror-transform");
exports.getScrollTop = function () {
    return (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0);
};
exports.getScrollLeft = function () {
    return (window.pageXOffset ||
        document.documentElement.scrollLeft ||
        document.body.scrollLeft ||
        0);
};
exports.getOffset = function (el) {
    var rect = el.getBoundingClientRect();
    return {
        top: rect.top + exports.getScrollTop(),
        left: rect.left + exports.getScrollLeft()
    };
};
exports.isInput = function (el) {
    return el.isContentEditable;
};
exports.getViewport = function () {
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
        exports.isInput(document.activeElement)) {
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
exports.markActive = function (type) { return function (state) {
    var _a = state.selection, from = _a.from, $from = _a.$from, to = _a.to, empty = _a.empty;
    return empty
        ? type.isInSet(state.storedMarks || $from.marks())
        : state.doc.rangeHasMark(from, to, type);
}; };
exports.getMarkInSelection = function (markName, state) {
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
exports.blockActive = function (type) { return function (state) {
    var selection = state.selection;
    var _a = state.selection, $from = _a.$from, to = _a.to;
    var $anchor = selection.$anchor;
    var resolvedPos = state.doc.resolve($anchor.pos);
    var rowNumber = resolvedPos.path[1];
    var i = 0;
    var firstNode = prosemirror_utils_1.findChildren(state.doc, function () {
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
exports.canInsert = function (type) { return function (state) {
    var $from = state.selection.$from;
    for (var d = $from.depth; d >= 0; d--) {
        var index = $from.index(d);
        if ($from.node(d).canReplaceWith(index, index, type)) {
            return true;
        }
    }
    return false;
}; };
exports.findNodePosition = function (doc, target) {
    var ret = -1;
    doc.descendants(function (node, pos) {
        if (node.eq(target)) {
            ret = pos;
        }
    });
    return ret;
};
exports.getRootNodeWithPosByIndex = function (state, index) {
    var i = 0;
    var firstNode = prosemirror_utils_1.findChildren(state.doc, function () {
        if (i === index) {
            i++;
            return true;
        }
        i++;
        return false;
    }, false)[0];
    return firstNode;
};
exports.getRootNodeCountFromState = function (state) {
    return state.doc.content.childCount;
};
exports.getParentNodeWithPosFromState = function (state) {
    var selection = state.selection;
    var $anchor = selection.$anchor;
    var resolvedPos = state.doc.resolve($anchor.pos);
    var rowNumber = resolvedPos.path[1];
    var i = 0;
    var firstNode = prosemirror_utils_1.findChildren(state.doc, function () {
        if (rowNumber === i) {
            i++;
            return true;
        }
        i++;
        return false;
    }, false)[0];
    return firstNode;
};
exports.getParentNodeIndexFromState = function (state) {
    var selection = state.selection;
    var $anchor = selection.$anchor;
    var resolvedPos = state.doc.resolve($anchor.pos);
    var rowNumber = resolvedPos.path[1];
    return rowNumber;
};
exports.getParentNodeFromState = function (state) {
    var firstNode = exports.getParentNodeWithPosFromState(state);
    var node = firstNode.node;
    return node;
};
exports.getParentNodePosFromState = function (state) {
    var node = exports.getParentNodeFromState(state);
    var pos = exports.findNodePosition(state.doc, node);
    return pos + node.nodeSize;
};
exports.findSelectedNodeWithType = function (nodeType, state) {
    var _a = state.selection, from = _a.from, to = _a.to;
    var applicable = false;
    var applicableNode = null;
    state.doc.nodesBetween(from, to, function (node) {
        if (applicable) {
            return false;
        }
        if (node.type === nodeType) {
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
        tr.step(new prosemirror_transform_1.ReplaceAroundStep(end - 1, endOfList, end, endOfList, new prosemirror_model_1.Slice(prosemirror_model_1.Fragment.from(itemType.create(null, range.parent.copy())), 1, 0), 1, true));
        range = new prosemirror_model_1.NodeRange(tr.doc.resolve(range.$from.pos), tr.doc.resolve(endOfList), range.depth);
    }
    dispatch(tr.lift(range, prosemirror_transform_1.liftTarget(range) - 1).scrollIntoView());
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
    var atStart = range.startIndex === 0;
    var atEnd = range.endIndex === list.childCount;
    var parent = $start.node(-1);
    var indexBefore = $start.index(-1);
    if (!parent.canReplace(indexBefore + (atStart ? 0 : 1), indexBefore + 1, item.content.append(atEnd ? prosemirror_model_1.Fragment.empty : prosemirror_model_1.Fragment.from(list)))) {
        return false;
    }
    var start = $start.pos;
    var end = start + item.nodeSize;
    tr.step(new prosemirror_transform_1.ReplaceAroundStep(start - (atStart ? 1 : 0), end + (atEnd ? 1 : 0), start + 1, end - 1, new prosemirror_model_1.Slice((atStart
        ? prosemirror_model_1.Fragment.empty
        : prosemirror_model_1.Fragment.from(list.copy(prosemirror_model_1.Fragment.empty))).append(atEnd ? prosemirror_model_1.Fragment.empty : prosemirror_model_1.Fragment.from(list.copy(prosemirror_model_1.Fragment.empty))), atStart ? 0 : 1, atEnd ? 0 : 1), atStart ? 0 : 1));
    dispatch(tr.scrollIntoView());
    return true;
}
exports.liftListItem = function (itemType) {
    return function (state, dispatch) {
        var _a = state.selection, $from = _a.$from, $to = _a.$to;
        var range = $from.blockRange($to, function (node) { return node.childCount && node.firstChild.type === itemType; });
        if (!range) {
            return false;
        }
        if (!dispatch) {
            return true;
        }
        if ($from.node(range.depth - 1).type === itemType) {
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
exports.createTable = function (schema, attrs, rowsCount, colsCount, withHeaderRow, cellContent) {
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
exports.calculateStyle = function (view, offset) {
    if (offset === void 0) { offset = { top: 0, left: 0 }; }
    var selection = view.state.selection;
    var dom = view.domAtPos(selection.$anchor.pos);
    var flag = dom.node instanceof Element;
    var element = flag ? dom.node : dom.node.parentElement;
    var elementTop = exports.getOffset(element).top;
    var coords = view.coordsAtPos(selection.$anchor.pos);
    var offsetTop = exports.getOffset(view.dom).top;
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
exports.isDescendant = function (parent, child) {
    var node = child.parentNode;
    while (node !== null) {
        if (node === parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
};
var unwrap = function (el) {
    var parent = el.parentNode;
    while (el.firstChild) {
        parent.insertBefore(el.firstChild, el);
    }
    parent.removeChild(el);
};
exports.stripPtag = function (html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    var ps = div.querySelectorAll('li > p');
    [].forEach.call(ps, function (p) {
        unwrap(p);
    });
    return div.innerHTML;
};
exports.getHtmlFromNode = function (doc, schema) {
    var fragment = prosemirror_model_1.DOMSerializer.fromSchema(schema).serializeFragment(doc.content);
    var div = document.createElement('div');
    div.appendChild(fragment);
    return exports.stripPtag(div.innerHTML);
};
exports.getBrowser = function () {
    var ua = window.navigator.userAgent.toLowerCase();
    var ver = window.navigator.appVersion.toLowerCase();
    var name = 'unknown';
    if (ua.indexOf('msie') !== -1) {
        if (ver.indexOf('msie 6.') !== -1) {
            name = 'ie6';
        }
        else if (ver.indexOf('msie 7.') !== -1) {
            name = 'ie7';
        }
        else if (ver.indexOf('msie 8.') !== -1) {
            name = 'ie8';
        }
        else if (ver.indexOf('msie 9.') !== -1) {
            name = 'ie9';
        }
        else if (ver.indexOf('msie 10.') !== -1) {
            name = 'ie10';
        }
        else {
            name = 'ie';
        }
    }
    else if (ua.indexOf('trident/7') !== -1) {
        name = 'ie11';
    }
    else if (ua.indexOf('edge') !== -1) {
        name = 'edge';
    }
    else if (ua.indexOf('chrome') !== -1) {
        name = 'chrome';
    }
    else if (ua.indexOf('safari') !== -1) {
        name = 'safari';
    }
    else if (ua.indexOf('opera') !== -1) {
        name = 'opera';
    }
    else if (ua.indexOf('firefox') !== -1) {
        name = 'firefox';
    }
    return name;
};
exports.getUniqId = function () {
    return (Date.now().toString(36) +
        Math.random()
            .toString(36)
            .substr(2, 5)).toUpperCase();
};
//# sourceMappingURL=index.js.map