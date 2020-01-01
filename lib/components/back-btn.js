"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var prosemirror_history_1 = require("prosemirror-history");
var styled_components_1 = require("styled-components");
var Undo_1 = require("./icons/Undo");
var appear = styled_components_1.keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n"], ["\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n"])));
var BackBtn = styled_components_1.default.button(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  background: #f2f2f4;\n  width: 44px;\n  height: 44px;\n  position: fixed;\n  top: 10px;\n  right: 10px;\n  z-index: 10;\n  color: #014cc5;\n  appearance: none;\n  border: none;\n  cursor: pointer;\n  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);\n  animation: ", " 0.3s;\n  svg {\n    fill: currentColor;\n  }\n"], ["\n  background: #f2f2f4;\n  width: 44px;\n  height: 44px;\n  position: fixed;\n  top: 10px;\n  right: 10px;\n  z-index: 10;\n  color: #014cc5;\n  appearance: none;\n  border: none;\n  cursor: pointer;\n  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);\n  animation: ", " 0.3s;\n  svg {\n    fill: currentColor;\n  }\n"])), appear);
exports.default = (function (props) {
    var _a = props.view, state = _a.state, dispatch = _a.dispatch;
    var depth = prosemirror_history_1.undoDepth(state);
    if (!depth) {
        return React.createElement(React.Fragment, null);
    }
    return (React.createElement(BackBtn, { onClick: function () {
            prosemirror_history_1.undo(state, dispatch);
        } },
        React.createElement(Undo_1.default, { style: { width: '24px', height: '24px' } })));
});
var templateObject_1, templateObject_2;
//# sourceMappingURL=back-btn.js.map