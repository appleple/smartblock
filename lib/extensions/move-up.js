import * as React from 'react';
import Icon from '../components/icon';
import moveUp from '../assets/images/icons/go-up.svg';
import { setTextSelection, findChildren } from 'prosemirror-utils';
import { findNodePosition } from '../utils';
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
            return React.createElement(Icon, { src: moveUp, width: 24, height: 24 });
        },
        enumerable: true,
        configurable: true
    });
    MoveUp.prototype.onClick = function (_state, _dispatch, view) {
        var state = view.state;
        var selection = state.selection;
        var $anchor = selection.$anchor;
        var resolvedPos = state.doc.resolve($anchor.pos);
        var rowNumber = resolvedPos.path[1];
        var i = 0;
        var _a = findChildren(state.doc, function (_node) {
            if (rowNumber === i || rowNumber - 1 === i) {
                i++;
                return true;
            }
            i++;
            return false;
        }, false), firstNode = _a[0], secondNode = _a[1];
        if (firstNode) {
            var firstIndex = firstNode.pos;
            var secondIndex = secondNode.pos;
            var removeTransaction = state.tr.delete(firstIndex, secondIndex);
            view.dispatch(removeTransaction);
            var firstNode2 = removeTransaction.doc.content.child(rowNumber - 1);
            var firstIndex2 = findNodePosition(removeTransaction.doc, firstNode2);
            var insertTransaction = view.state.tr.insert(firstIndex2 + firstNode2.nodeSize, firstNode.node);
            view.dispatch(insertTransaction);
            view.dispatch(setTextSelection(firstIndex2)(view.state.tr));
            view.state.tr.scrollIntoView();
        }
    };
    return MoveUp;
}());
export default MoveUp;
//# sourceMappingURL=move-up.js.map