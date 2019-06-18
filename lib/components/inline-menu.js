var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { getOffset, getScrollTop } from '../utils';
import ButtonStyle from './button';
var fadeIn = keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n"], ["\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n"])));
var FloaterStyle = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: absolute;\n  z-index: 12;\n  animation: ", " 0.3s;\n  margin-top: 8px;\n  border-radius: 5px;\n  background-color: #fff;\n  color: #fff;\n  box-shadow: 0 3px 40px 8px rgba(116, 116, 116, 0.2);\n  &:before {\n    position: absolute;\n    left: 20px;\n    top: -12px;\n    content: '';\n    display: block;\n    border-style: solid;\n    border-width: 0 12px 12px 12px;\n    border-color: transparent transparent #ffffff transparent;\n  }\n"], ["\n  position: absolute;\n  z-index: 12;\n  animation: ", " 0.3s;\n  margin-top: 8px;\n  border-radius: 5px;\n  background-color: #fff;\n  color: #fff;\n  box-shadow: 0 3px 40px 8px rgba(116, 116, 116, 0.2);\n  &:before {\n    position: absolute;\n    left: 20px;\n    top: -12px;\n    content: '';\n    display: block;\n    border-style: solid;\n    border-width: 0 12px 12px 12px;\n    border-color: transparent transparent #ffffff transparent;\n  }\n"])), fadeIn);
var Bar = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  padding: 5px;\n  display: flex;\n  align-items: baseline;\n"], ["\n  padding: 5px;\n  display: flex;\n  align-items: baseline;\n"])));
var ARROWOFFSET = 50;
var ARROWTOPOFFSET = 25;
var calculateStyle = function (view) {
    var selection = view.state.selection;
    if (!selection || selection.empty) {
        return {
            left: -1000,
            top: 0
        };
    }
    var left = getOffset(view.dom).left;
    var coords = view.coordsAtPos(selection.$head.pos);
    var offsetTop = getOffset(view.dom).top;
    var top = coords.top + getScrollTop() + ARROWTOPOFFSET - offsetTop;
    if (window.innerWidth <= 767) {
        return {
            left: 5,
            top: top
        };
    }
    return {
        left: coords.left - ARROWOFFSET - left,
        top: top
    };
};
var MenuBar = function (_a) {
    var menu = _a.menu, children = _a.children, view = _a.view;
    var style = calculateStyle(view);
    var state = view.state, dispatch = view.dispatch;
    return (React.createElement(FloaterStyle, { style: style },
        React.createElement(Bar, null,
            children,
            menu.map(function (item, key) {
                return (React.createElement(ButtonStyle, { key: "inline-" + key, type: "button", active: item.active && item.active(state), title: item.title, disabled: item.enable && !item.enable(state), onClick: function (e) {
                        e.preventDefault();
                        item.onClick(state, dispatch);
                    } }, item.icon));
            }))));
};
export default MenuBar;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=inline-menu.js.map