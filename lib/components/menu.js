var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { findChildren } from 'prosemirror-utils';
import { getOffset, getParentNodeFromState } from '../utils';
import ButtonStyle from './button';
var useState = React.useState, useEffect = React.useEffect;
var fadeIn = keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n"], ["\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n"])));
var PositionBtnGroup = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: absolute;\n  z-index: 10;\n  animation: ", " 0.3s;\n  border-radius: 5px;\n  box-shadow: 0 3px 40px 8px rgba(116, 116, 116, 0.2);\n  padding: 5px 0;\n  color: #767676;\n  background-color: #fff;\n  &:before {\n    position: absolute;\n    left: 20px;\n    top: -12px;\n    content: '';\n    display: block;\n    border-style: solid;\n    border-width: 0 12px 12px 12px;\n    border-color: transparent transparent #ffffff transparent;\n  }\n"], ["\n  position: absolute;\n  z-index: 10;\n  animation: ", " 0.3s;\n  border-radius: 5px;\n  box-shadow: 0 3px 40px 8px rgba(116, 116, 116, 0.2);\n  padding: 5px 0;\n  color: #767676;\n  background-color: #fff;\n  &:before {\n    position: absolute;\n    left: 20px;\n    top: -12px;\n    content: '';\n    display: block;\n    border-style: solid;\n    border-width: 0 12px 12px 12px;\n    border-color: transparent transparent #ffffff transparent;\n  }\n"])), fadeIn);
var PositionBtnGroupTop = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  padding: 0 5px 0 5px;\n"], ["\n  padding: 0 5px 0 5px;\n"])));
var PositionBtnGroupBottom = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  border-top: 1px solid #ccc;\n  margin: 5px 0 0 0;\n  padding: 5px 5px 0 5px;\n"], ["\n  border-top: 1px solid #ccc;\n  margin: 5px 0 0 0;\n  padding: 5px 5px 0 5px;\n"])));
var calculateStyle = function (props) {
    var view = props.view;
    var state = view.state;
    var selection = state.selection;
    if (!selection || !selection.empty) {
        return {
            left: -1000,
            top: 0
        };
    }
    var $anchor = selection.$anchor;
    if ($anchor.pos === 0) {
        return {
            right: -1000,
            top: 0
        };
    }
    var resolvedPos = state.doc.resolve($anchor.pos);
    var rowNumber = resolvedPos.path[1];
    var i = 0;
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
    var offsetTop = getOffset(view.dom).top;
    if (coords.top === 0) {
        return {
            top: -1000
        };
    }
    if (dom && dom.offsetHeight) {
        return {
            left: 5,
            top: elementTop + dom.offsetHeight - offsetTop + 20
        };
    }
    return {
        left: 5,
        top: elementTop - offsetTop + 20
    };
};
var getActiveMenu = function (props) {
    var menu = props.menu, view = props.view;
    var state = view.state;
    var activeItem = menu.find(function (item) {
        if (item.active && item.active(state)) {
            return true;
        }
        return false;
    });
    if (activeItem && activeItem.customMenu) {
        return React.createElement(React.Fragment, null, activeItem.customMenu(view));
    }
    return React.createElement(React.Fragment, null);
};
var shouldRenderMenu = function (props) {
    var menu = props.menu, view = props.view;
    var node = getParentNodeFromState(view.state);
    if (!node || !menu || !menu.length) {
        return;
    }
    var name = node.type.name;
    var selectedItem = menu.find(function (item) {
        if (item.name === name) {
            return true;
        }
        return false;
    });
    if (!selectedItem) {
        return true;
    }
    if (selectedItem.hideMenuOnFocus) {
        return false;
    }
    return true;
};
export default (function (props) {
    var menu = props.menu, view = props.view;
    var state = view.state, dispatch = view.dispatch;
    var CustomMenu = getActiveMenu(props);
    var shouldRender = shouldRenderMenu(props);
    var _a = useState({
        left: 0,
        top: 0
    }), style = _a[0], setState = _a[1];
    useEffect(function () {
        var nextStyle = calculateStyle(props);
        setState(nextStyle);
    }, [props]);
    if (!shouldRender) {
        return null;
    }
    return (React.createElement(PositionBtnGroup, { style: style },
        React.createElement(PositionBtnGroupTop, null, menu.map(function (item, key) {
            return (React.createElement(ButtonStyle, { key: key, type: "button", active: item.active && item.active(state), title: item.title, disabled: item.enable && !item.enable(state), onClick: function (e) {
                    e.preventDefault();
                    item.onClick(state, dispatch, view);
                } }, item.icon));
        })),
        CustomMenu && CustomMenu.props && CustomMenu.props.children && (React.createElement(PositionBtnGroupBottom, null, CustomMenu))));
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=menu.js.map