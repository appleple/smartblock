import * as React from 'react';
import { setTextSelection } from 'prosemirror-utils';
import MoveDownIcon from '../components/icons/GoDown';
import { findNodePosition, getParentNodeIndexFromState, getRootNodeWithPosByIndex, getRootNodeCountFromState } from '../utils';
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
    MoveDown.prototype.enable = function (state) {
        var length = getRootNodeCountFromState(state);
        var rowNumber = getParentNodeIndexFromState(state);
        return rowNumber < length - 1;
    };
    MoveDown.prototype.onClick = function (_state, _dispatch, view) {
        var state = view.state;
        var rowNumber = getParentNodeIndexFromState(state);
        var firstNode = getRootNodeWithPosByIndex(state, rowNumber);
        var secondNode = getRootNodeWithPosByIndex(state, rowNumber + 1);
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