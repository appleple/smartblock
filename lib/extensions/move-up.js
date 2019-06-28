import * as React from 'react';
import { setTextSelection } from 'prosemirror-utils';
import MoveUpIcon from '../components/icons/GoUp';
import { findNodePosition, getParentNodeIndexFromState, getRootNodeWithPosByIndex } from '../utils';
var MoveUp = /** @class */ (function () {
    function MoveUp() {
    }
    Object.defineProperty(MoveUp.prototype, "name", {
        get: function () {
            return 'move-up';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MoveUp.prototype, "group", {
        get: function () {
            return 'edit';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MoveUp.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MoveUp.prototype, "icon", {
        get: function () {
            return React.createElement(MoveUpIcon, { style: { width: '24px', height: '24px' } });
        },
        enumerable: true,
        configurable: true
    });
    MoveUp.prototype.enable = function (state) {
        return getParentNodeIndexFromState(state) >= 1;
    };
    MoveUp.prototype.onClick = function (_state, _dispatch, view) {
        var state = view.state;
        var rowNumber = getParentNodeIndexFromState(state);
        var firstNode = getRootNodeWithPosByIndex(state, rowNumber - 1);
        var secondNode = getRootNodeWithPosByIndex(state, rowNumber);
        if (firstNode) {
            var firstIndex = firstNode.pos;
            var secondIndex = secondNode.pos;
            var removeTransaction = state.tr.delete(firstIndex, secondIndex);
            view.dispatch(removeTransaction);
            var firstNode2 = removeTransaction.doc.content.child(rowNumber - 1);
            var firstIndex2 = findNodePosition(removeTransaction.doc, firstNode2);
            var insertTransaction = view.state.tr.insert(firstIndex2 + firstNode2.nodeSize, firstNode.node);
            view.dispatch(insertTransaction);
            view.dispatch(setTextSelection(firstIndex2)(view.state.tr).scrollIntoView());
        }
    };
    return MoveUp;
}());
export default MoveUp;
//# sourceMappingURL=move-up.js.map