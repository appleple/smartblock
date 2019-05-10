"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var map_1 = require("lodash/map");
var styled_components_1 = require("styled-components");
var fadeIn = styled_components_1.keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n"], ["\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n"])));
var FloaterStyle = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: absolute;\n  z-index: 12;\n  animation: ", " 0.3s;\n  margin-top: 8px;\n  border-radius: 5px;\n  background-color: #FFF;\n  box-shadow: 0 3px 40px 8px rgba(116,116,116,0.2);\n"], ["\n  position: absolute;\n  z-index: 12;\n  animation: ", " 0.3s;\n  margin-top: 8px;\n  border-radius: 5px;\n  background-color: #FFF;\n  box-shadow: 0 3px 40px 8px rgba(116,116,116,0.2);\n"])), fadeIn);
var ButtonStyle = styled_components_1.default.button(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  ", "\n  background: #fff;\n  border: none;\n  font-size: inherit;\n  cursor: pointer;\n  color: #777;\n  border-radius: 0;\n  padding: 5px 10px;\n"], ["\n  ",
    "\n  background: #fff;\n  border: none;\n  font-size: inherit;\n  cursor: pointer;\n  color: #777;\n  border-radius: 0;\n  padding: 5px 10px;\n"])), function (props) {
    if (props.active) {
        return "\n        color: #000;\n      ";
    }
});
var Bar = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  margin-bottom: 5px;\n  display: flex;\n  align-items: baseline;\n"], ["\n  margin-bottom: 5px;\n  display: flex;\n  align-items: baseline;\n"])));
var Button = function (_a) {
    var state = _a.state, dispatch = _a.dispatch;
    return function (item, key) { return (React.createElement(ButtonStyle, { key: key, type: 'button', active: item.active && item.active(state), title: item.title, disabled: item.enable && !item.enable(state), onMouseDown: function (e) {
            e.preventDefault();
            item.onClick(state, dispatch);
        } }, item.icon)); };
};
var calculateStyle = function (view) {
    var selection = view.state.selection;
    if (!selection || selection.empty) {
        return {
            left: -1000,
            top: 0
        };
    }
    var coords = view.coordsAtPos(selection.$anchor.pos);
    var app = document.querySelector('#container');
    var width = app.offsetWidth;
    return {
        left: coords.left - ((window.innerWidth - width) / 2),
        top: coords.top + 20
    };
};
var MenuBar = function (_a) {
    var menu = _a.menu, children = _a.children, view = _a.view;
    var style = calculateStyle(view);
    return (React.createElement(FloaterStyle, { style: style },
        React.createElement(Bar, null,
            children,
            map_1.default(menu, function (item, key) { return (React.createElement("span", { key: key }, map_1.default(item, Button(view)))); }))));
};
exports.default = MenuBar;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=inline-menu.js.map