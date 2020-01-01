"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var prosemirror_utils_1 = require("prosemirror-utils");
var GoDown_1 = require("../components/icons/GoDown");
var utils_1 = require("../utils");
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
            return React.createElement(GoDown_1.default, { style: { width: '24px', height: '24px' } });
        },
        enumerable: true,
        configurable: true
    });
    MoveDown.prototype.enable = function (state) {
        var length = utils_1.getRootNodeCountFromState(state);
        var rowNumber = utils_1.getParentNodeIndexFromState(state);
        return rowNumber < length - 1;
    };
    MoveDown.prototype.onClick = function (_state, _dispatch, view) {
        var state = view.state;
        var rowNumber = utils_1.getParentNodeIndexFromState(state);
        var firstNode = utils_1.getRootNodeWithPosByIndex(state, rowNumber);
        var secondNode = utils_1.getRootNodeWithPosByIndex(state, rowNumber + 1);
        if (secondNode) {
            var firstIndex = firstNode.pos;
            var secondIndex = secondNode.pos;
            var removeTransaction = state.tr.delete(firstIndex, secondIndex);
            view.dispatch(removeTransaction);
            var firstNode2 = removeTransaction.doc.content.child(rowNumber);
            var firstIndex2 = utils_1.findNodePosition(removeTransaction.doc, firstNode2);
            var insertTransaction = view.state.tr.insert(firstIndex2 + firstNode2.nodeSize, firstNode.node);
            view.dispatch(insertTransaction);
            view.dispatch(prosemirror_utils_1.setTextSelection(firstIndex2 + firstNode2.nodeSize)(view.state.tr).scrollIntoView());
        }
    };
    return MoveDown;
}());
exports.default = MoveDown;
//# sourceMappingURL=move-down.js.map