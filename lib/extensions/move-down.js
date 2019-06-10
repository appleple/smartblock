import * as React from 'react';
import { setTextSelection, findChildren } from 'prosemirror-utils';
import MoveDownIcon from '../components/icons/GoDown';
import { findNodePosition } from '../utils';
var MoveDown = /** @class */ (function () {
    function MoveDown() {
    }
    Object.defineProperty(MoveDown.prototype, "name", {
        get: function () {
            return 'move-down';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MoveDown.prototype, "group", {
        get: function () {
            return 'edit';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MoveDown.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MoveDown.prototype, "icon", {
        get: function () {
            return React.createElement(MoveDownIcon, { style: { width: '24px', height: '24px' } });
        },
        enumerable: true,
        configurable: true
    });
    MoveDown.prototype.onClick = function (_state, _dispatch, view) {
        var state = view.state;
        var selection = state.selection;
        var $anchor = selection.$anchor;
        var resolvedPos = state.doc.resolve($anchor.pos);
        var rowNumber = resolvedPos.path[1];
        var i = 0;
        var _a = findChildren(state.doc, function (_node) {
            if (rowNumber === i || rowNumber + 1 === i) {
                i++;
                return true;
            }
            i++;
            return false;
        }, false), firstNode = _a[0], secondNode = _a[1];
        if (secondNode) {
            var firstIndex = firstNode.pos;
            var secondIndex = secondNode.pos;
            var removeTransaction = state.tr.delete(firstIndex, secondIndex);
            view.dispatch(removeTransaction);
            var firstNode2 = removeTransaction.doc.content.child(rowNumber);
            var firstIndex2 = findNodePosition(removeTransaction.doc, firstNode2);
            var insertTransaction = view.state.tr.insert(firstIndex2 + firstNode2.nodeSize, firstNode.node);
            view.dispatch(insertTransaction);
            view.dispatch(setTextSelection(firstIndex2 + firstNode2.nodeSize)(view.state.tr).scrollIntoView());
        }
    };
    return MoveDown;
}());
export default MoveDown;
//# sourceMappingURL=move-down.js.map