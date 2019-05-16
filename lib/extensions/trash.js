import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/fontawesome-free-solid';
import { findChildren } from 'prosemirror-utils';
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
    Object.defineProperty(Trash.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Trash.prototype, "schema", {
        get: function () {
            return {
                group: 'block'
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Trash.prototype, "icon", {
        get: function () {
            return React.createElement(FontAwesomeIcon, { icon: faTrash });
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