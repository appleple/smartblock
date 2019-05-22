var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import * as React from 'react';
import map from 'lodash/map';
import styled, { keyframes } from 'styled-components';
import { getOffset } from '../utils';
var fadeIn = keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n"], ["\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n"])));
var FloaterStyle = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: absolute;\n  z-index: 12;\n  animation: ", " 0.3s;\n  margin-top: 8px;\n  border-radius: 5px;\n  background-color: #FFF;\n  box-shadow: 0 3px 40px 8px rgba(116,116,116,0.2);\n"], ["\n  position: absolute;\n  z-index: 12;\n  animation: ", " 0.3s;\n  margin-top: 8px;\n  border-radius: 5px;\n  background-color: #FFF;\n  box-shadow: 0 3px 40px 8px rgba(116,116,116,0.2);\n"])), fadeIn);
var ButtonStyle = styled.button(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  ", "\n  font-size: 20px;\n  background: #fff;\n  border: none;\n  cursor: pointer;\n  color: #777;\n  border-radius: 0;\n  padding: 5px 10px;\n"], ["\n  ",
    "\n  font-size: 20px;\n  background: #fff;\n  border: none;\n  cursor: pointer;\n  color: #777;\n  border-radius: 0;\n  padding: 5px 10px;\n"])), function (props) {
    if (props.active) {
        return "\n        color: #000;\n      ";
    }
});
var Bar = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  padding: 5px 0;\n  display: flex;\n  align-items: baseline;\n"], ["\n  padding: 5px 0;\n  display: flex;\n  align-items: baseline;\n"])));
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
    var dom = view.domAtPos(selection.$anchor.pos);
    var flag = dom.node instanceof Element;
    var element = flag ? dom.node : dom.node.parentElement;
    var elementTop = getOffset(element).top;
    var coords = view.coordsAtPos(selection.$anchor.pos);
    var app = document.querySelector('#container');
    var width = app.offsetWidth;
    if (window.innerWidth <= 767) {
        return {
            left: 5,
            top: elementTop + element.offsetHeight
        };
    }
    return {
        left: coords.left - ((window.innerWidth - width) / 2),
        top: elementTop + element.offsetHeight
    };
};
var MenuBar = function (_a) {
    var menu = _a.menu, children = _a.children, view = _a.view;
    var style = calculateStyle(view);
    return (React.createElement(FloaterStyle, { style: style },
        React.createElement(Bar, null,
            children,
            map(menu, function (item, key) { return (React.createElement("span", { key: key }, map(item, Button(view)))); }))));
};
export default MenuBar;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=inline-menu.js.map