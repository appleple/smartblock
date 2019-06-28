var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { getOffset, getScrollTop } from '../utils';
import ButtonStyle from './button';
var useState = React.useState, useRef = React.useRef;
var fadeIn = keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n"], ["\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n"])));
var FloaterStyle = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: absolute;\n  z-index: 12;\n  animation: ", " 0.3s;\n  margin-top: 8px;\n  border-radius: 5px;\n  background-color: #fff;\n  color: #fff;\n  box-shadow: 0 3px 40px 8px rgba(116, 116, 116, 0.2);\n  &:before {\n    position: absolute;\n    ", "\n    top: -12px;\n    content: '';\n    display: block;\n    border-style: solid;\n    border-width: 0 12px 12px 12px;\n    border-color: transparent transparent #ffffff transparent;\n  }\n"], ["\n  position: absolute;\n  z-index: 12;\n  animation: ", " 0.3s;\n  margin-top: 8px;\n  border-radius: 5px;\n  background-color: #fff;\n  color: #fff;\n  box-shadow: 0 3px 40px 8px rgba(116, 116, 116, 0.2);\n  &:before {\n    position: absolute;\n    ",
    "\n    top: -12px;\n    content: '';\n    display: block;\n    border-style: solid;\n    border-width: 0 12px 12px 12px;\n    border-color: transparent transparent #ffffff transparent;\n  }\n"])), fadeIn, function (props) { return "\n    left: " + props.pos + "px;\n    "; });
var Bar = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  padding: 5px;\n  display: flex;\n  align-items: baseline;\n"], ["\n  padding: 5px;\n  display: flex;\n  align-items: baseline;\n"])));
var ARROWOFFSET = 50;
var ARROWTOPOFFSET = 25;
var calculateStyle = function (view, container) {
    var selection = view.state.selection;
    var offsetLeft = getOffset(view.dom).left;
    var coords = view.coordsAtPos(selection.$head.pos);
    var offsetTop = getOffset(view.dom).top;
    var top = coords.top + getScrollTop() + ARROWTOPOFFSET - offsetTop;
    var left = coords.left - ARROWOFFSET - offsetLeft;
    if (container && container.current && container.current.offsetWidth) {
        var width = container.current.offsetWidth;
        if (left + width > window.innerWidth) {
            return {
                top: top,
                left: window.innerWidth - width
            };
        }
    }
    return {
        left: left,
        top: top
    };
};
var calculateArrowPos = function (view, container) {
    var selection = view.state.selection;
    var offsetLeft = getOffset(view.dom).left;
    var coords = view.coordsAtPos(selection.$head.pos);
    var left = coords.left - ARROWOFFSET - offsetLeft;
    var width = container.current ? container.current.offsetWidth : 0;
    if (container && container.current && container.current.offsetWidth) {
        if (left + width > window.innerWidth) {
            return left - window.innerWidth + width;
        }
    }
    return 20;
};
var MenuBar = function (_a) {
    var menu = _a.menu, children = _a.children, view = _a.view;
    var state = view.state, dispatch = view.dispatch;
    var selection = view.state.selection;
    if (!selection || selection.empty) {
        return React.createElement(React.Fragment, null);
    }
    var container = useRef(null);
    var style = calculateStyle(view, container);
    var pos = calculateArrowPos(view, container);
    return (React.createElement(FloaterStyle, { style: style, ref: container, pos: pos },
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