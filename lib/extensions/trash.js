import * as React from 'react';
import { findChildren } from 'prosemirror-utils';
import TrashIcon from '../components/icons/Trash';
var Trash = /** @class */ (function () {
    function Trash() {
    }
    Object.defineProperty(Trash.prototype, "name", {
        get: function () {
            return 'trash';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Trash.prototype, "group", {
        get: function () {
            return 'edit';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Trash.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Trash.prototype, "icon", {
        get: function () {
            return React.createElement(TrashIcon, { style: { width: '24px', height: '24px' } });
        },
        enumerable: true,
        configurable: true
    });
    Trash.prototype.onClick = function (state, dispatch) {
        var selection = state.selection;
        var $anchor = selection.$anchor;
        var resolvedPos = state.doc.resolve($anchor.pos);
        var rowNumber = resolvedPos.path[1];
        var i = 0;
        var firstNode = findChildren(state.doc, function (_node) {
            if (rowNumber === i) {
                i++;
                return true;
            }
            i++;
            return false;
        }, false)[0];
        var firstIndex = firstNode.pos;
        var removeTransaction = state.tr.delete(firstIndex, firstIndex + firstNode.node.content.size + 2);
        dispatch(removeTransaction);
    };
    return Trash;
}());
export default Trash;
//# sourceMappingURL=trash.js.map