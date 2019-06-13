var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { findChildren } from 'prosemirror-utils';
import { getOffset } from '../utils';
import ButtonStyle from './button';
var useState = React.useState, useEffect = React.useEffect;
var fadeIn = keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n"], ["\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n"])));
var PositionBtnGroup = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: absolute;\n  right: 0;\n  z-index: 10;\n  max-width: 280px;\n  animation: ", " 0.3s;\n  border-radius: 5px;\n  padding: 5px;\n  background-color: #f2f2f4;\n"], ["\n  position: absolute;\n  right: 0;\n  z-index: 10;\n  max-width: 280px;\n  animation: ", " 0.3s;\n  border-radius: 5px;\n  padding: 5px;\n  background-color: #f2f2f4;\n"])), fadeIn);
var getContainerOffset = function (container) {
    return getOffset(container).top;
};
var calculateStyle = function (props) {
    var view = props.view;
    var state = view.state;
    var selection = state.selection;
    if (!selection) {
        return {
            right: -1000,
            top: 0
        };
    }
    var $anchor = selection.$anchor;
    var resolvedPos = state.doc.resolve($anchor.pos);
    var rowNumber = resolvedPos.path[1];
    var i = 0;
    if ($anchor.pos === 0) {
        return {
            right: -1000,
            top: 0
        };
    }
    var firstNode = findChildren(state.doc, function (_node) {
        if (rowNumber === i || rowNumber + 1 === i) {
            i++;
            return true;
        }
        i++;
        return false;
    }, false)[0];
    if (!firstNode) {
        return {
            top: -1000
        };
    }
    var coords = view.coordsAtPos(firstNode.pos);
    var dom = view.nodeDOM(firstNode.pos);
    var elementTop = getOffset(dom).top;
    var offsetTop = getContainerOffset(view.dom);
    if (coords.top === 0) {
        return {
            top: -1000
        };
    }
    return {
        right: 20,
        top: elementTop - offsetTop - 35
    };
};
export default (function (props) {
    var _a = useState({
        right: 20,
        top: 0
    }), style = _a[0], setState = _a[1];
    var menu = props.menu, view = props.view;
    var state = view.state, dispatch = view.dispatch;
    useEffect(function () {
        var nextStyle = calculateStyle(props);
        setState(nextStyle);
    }, [props]);
    return (React.createElement(PositionBtnGroup, { style: style }, menu.map(function (item, key) {
        return (React.createElement(ButtonStyle, { style: { backgroundColor: 'transparent', width: '32px' }, key: "edit-" + key, type: "button", color: item.btnColor, active: item.active && item.active(state), title: item.title, disabled: item.enable && !item.enable(state), onMouseDown: function (e) {
                e.preventDefault();
                item.onClick(state, dispatch, view);
            } }, item.icon));
    })));
});
var templateObject_1, templateObject_2;
//# sourceMappingURL=edit-menu.js.map