var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { getOffset } from '../utils';
import ButtonStyle from './button';
var fadeIn = keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n"], ["\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n"])));
var FloaterStyle = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: absolute;\n  z-index: 12;\n  animation: ", " 0.3s;\n  margin-top: 8px;\n  border-radius: 5px;\n  background-color: #FFF;\n  color: #FFF;\n  box-shadow: 0 3px 40px 8px rgba(116,116,116,0.2);\n  &:before {\n    position: absolute;\n    left: 20px;\n    top: -12px;\n    content: \"\";\n    display: block;\n    border-style: solid;\n    border-width: 0 11.5px 12px 11.5px;\n    border-color: transparent transparent #ffffff transparent;\n  }\n"], ["\n  position: absolute;\n  z-index: 12;\n  animation: ", " 0.3s;\n  margin-top: 8px;\n  border-radius: 5px;\n  background-color: #FFF;\n  color: #FFF;\n  box-shadow: 0 3px 40px 8px rgba(116,116,116,0.2);\n  &:before {\n    position: absolute;\n    left: 20px;\n    top: -12px;\n    content: \"\";\n    display: block;\n    border-style: solid;\n    border-width: 0 11.5px 12px 11.5px;\n    border-color: transparent transparent #ffffff transparent;\n  }\n"])), fadeIn);
var Bar = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  padding: 5px;\n  display: flex;\n  align-items: baseline;\n"], ["\n  padding: 5px;\n  display: flex;\n  align-items: baseline;\n"])));
var calculateStyle = function (view, offsetTop, width) {
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
    if (window.innerWidth <= 767) {
        return {
            left: 5,
            top: elementTop + element.offsetHeight - offsetTop + 10
        };
    }
    return {
        left: coords.left - ((window.innerWidth - width) / 2),
        top: elementTop + element.offsetHeight - offsetTop + 10
    };
};
var getContainerOffset = function (container) {
    return getOffset(container).top;
};
var getContainerWidth = function (container) {
    return container.offsetWidth;
};
var MenuBar = function (_a) {
    var menu = _a.menu, children = _a.children, view = _a.view;
    var offsetTop = getContainerOffset(view.dom);
    var width = getContainerWidth(view.dom);
    var style = calculateStyle(view, offsetTop, width);
    var state = view.state, dispatch = view.dispatch;
    return (React.createElement(FloaterStyle, { style: style },
        React.createElement(Bar, null,
            children,
            menu.map(function (item, key) {
                return (React.createElement(ButtonStyle, { key: "inline-" + key, type: 'button', active: item.active && item.active(state), title: item.title, disabled: item.enable && !item.enable(state), onMouseDown: function (e) {
                        e.preventDefault();
                        item.onClick(state, dispatch);
                    } }, item.icon));
            }))));
};
export default MenuBar;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=inline-menu.js.map