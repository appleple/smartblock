import { findChildren } from 'prosemirror-utils';
export var getScrollTop = function () {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
};
export var getScrollLeft = function () {
    return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
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
    if (/iPod|iPhone|iPad/.test(navigator.platform) && isInput(document.activeElement)) { // iOS *lies* about viewport size when keyboard is visible. See http://stackoverflow.com/questions/2593139/ipad-web-app-detect-virtual-keyboard-using-javascript-in-safari Input focus/blur can indicate, also scrollTop: 
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
export var blockActive = function (type) { return function (state) {
    var selection = state.selection;
    var _a = state.selection, $from = _a.$from, to = _a.to;
    var $anchor = selection.$anchor;
    var resolvedPos = state.doc.resolve($anchor.pos);
    var rowNumber = resolvedPos.path[1];
    var i = 0;
    var firstNode = findChildren(state.doc, function (_node) {
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
//# sourceMappingURL=index.js.map