"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var prosemirror_history_1 = require("prosemirror-history");
var undo_1 = require("./icons/undo");
exports.default = (function (props) {
    var _a = props.view, state = _a.state, dispatch = _a.dispatch;
    var depth = prosemirror_history_1.undoDepth(state);
    if (!depth) {
        return React.createElement(React.Fragment, null);
    }
    return (React.createElement("button", { className: "smartblock-backbtn", onClick: function () {
            prosemirror_history_1.undo(state, dispatch);
        } },
        React.createElement(undo_1.default, { style: { width: '24px', height: '24px' } })));
});
//# sourceMappingURL=back-btn.js.map