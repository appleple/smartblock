"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var prosemirror_utils_1 = require("prosemirror-utils");
var go_up_1 = require("../components/icons/go-up");
var utils_1 = require("../utils");
var MoveUp = /** @class */ (function () {
    function MoveUp() {
    }
    Object.defineProperty(MoveUp.prototype, "name", {
        get: function () {
            return 'move-up';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MoveUp.prototype, "group", {
        get: function () {
            return 'edit';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MoveUp.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MoveUp.prototype, "icon", {
        get: function () {
            return React.createElement(go_up_1.default, { style: { width: '24px', height: '24px' } });
        },
        enumerable: false,
        configurable: true
    });
    MoveUp.prototype.enable = function (state) {
        return (0, utils_1.getParentNodeIndexFromState)(state) >= 1;
    };
    MoveUp.prototype.onClick = function (_state, _dispatch, view) {
        var state = view.state;
        var rowNumber = (0, utils_1.getParentNodeIndexFromState)(state);
        var firstNode = (0, utils_1.getRootNodeWithPosByIndex)(state, rowNumber - 1);
        var secondNode = (0, utils_1.getRootNodeWithPosByIndex)(state, rowNumber);
        if (firstNode) {
            var firstIndex = firstNode.pos;
            var secondIndex = secondNode.pos;
            var removeTransaction = state.tr.delete(firstIndex, secondIndex);
            view.dispatch(removeTransaction);
            var firstNode2 = removeTransaction.doc.content.child(rowNumber - 1);
            var firstIndex2 = (0, utils_1.findNodePosition)(removeTransaction.doc, firstNode2);
            var insertTransaction = view.state.tr.insert(firstIndex2 + firstNode2.nodeSize, firstNode.node);
            view.dispatch(insertTransaction);
            view.dispatch((0, prosemirror_utils_1.setTextSelection)(firstIndex2)(view.state.tr).scrollIntoView());
        }
    };
    return MoveUp;
}());
exports.default = MoveUp;
//# sourceMappingURL=move-up.js.map