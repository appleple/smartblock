"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var prosemirror_utils_1 = require("prosemirror-utils");
var go_down_1 = require("../components/icons/go-down");
var utils_1 = require("../utils");
var MoveDown = /** @class */ (function () {
    function MoveDown() {
    }
    Object.defineProperty(MoveDown.prototype, "name", {
        get: function () {
            return 'move-down';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MoveDown.prototype, "group", {
        get: function () {
            return 'edit';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MoveDown.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MoveDown.prototype, "icon", {
        get: function () {
            return React.createElement(go_down_1.default, { style: { width: '24px', height: '24px' } });
        },
        enumerable: false,
        configurable: true
    });
    MoveDown.prototype.enable = function (state) {
        var length = (0, utils_1.getRootNodeCountFromState)(state);
        var rowNumber = (0, utils_1.getParentNodeIndexFromState)(state);
        return rowNumber < length - 1;
    };
    MoveDown.prototype.onClick = function (_state, _dispatch, view) {
        var state = view.state;
        var rowNumber = (0, utils_1.getParentNodeIndexFromState)(state);
        var firstNode = (0, utils_1.getRootNodeWithPosByIndex)(state, rowNumber);
        var secondNode = (0, utils_1.getRootNodeWithPosByIndex)(state, rowNumber + 1);
        if (secondNode) {
            var firstIndex = firstNode.pos;
            var secondIndex = secondNode.pos;
            var removeTransaction = state.tr.delete(firstIndex, secondIndex);
            view.dispatch(removeTransaction);
            var firstNode2 = removeTransaction.doc.content.child(rowNumber);
            var firstIndex2 = (0, utils_1.findNodePosition)(removeTransaction.doc, firstNode2);
            var insertTransaction = view.state.tr.insert(firstIndex2 + firstNode2.nodeSize, firstNode.node);
            view.dispatch(insertTransaction);
            view.dispatch((0, prosemirror_utils_1.setTextSelection)(firstIndex2 + firstNode2.nodeSize)(view.state.tr).scrollIntoView());
        }
    };
    return MoveDown;
}());
exports.default = MoveDown;
//# sourceMappingURL=move-down.js.map