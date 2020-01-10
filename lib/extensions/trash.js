"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var prosemirror_utils_1 = require("prosemirror-utils");
var Trash_1 = require("../components/icons/Trash");
var is_mobile_1 = require("is-mobile");
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
            return React.createElement(Trash_1.default, { style: { width: '18px', height: '18px' } });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Trash.prototype, "btnColor", {
        get: function () {
            return 'black';
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
        var firstNode = prosemirror_utils_1.findChildren(state.doc, function (_node) {
            if (rowNumber === i) {
                i++;
                return true;
            }
            i++;
            return false;
        }, false)[0];
        var firstIndex = firstNode.pos;
        var removeTransaction = state.tr.delete(firstIndex, firstIndex + firstNode.node.content.size + 2);
        if (is_mobile_1.default() && confirm('このブロックを削除してもいいですか？')) {
            dispatch(removeTransaction);
        }
    };
    return Trash;
}());
exports.default = Trash;
//# sourceMappingURL=trash.js.map