var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { findChildren } from 'prosemirror-utils';
import { getOffset, getParentNodeFromState } from '../utils';
import ButtonStyle from './button';
var fadeIn = keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n"], ["\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n"])));
var PositionBtnGroup = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: absolute;\n  z-index: 10;\n  max-width: 280px;\n  animation: ", " 0.3s;\n  border-radius: 5px;\n  box-shadow: 0 3px 40px 8px rgba(116,116,116,0.2);\n  padding: 5px 0;\n  color: #767676;\n  background-color: #FFF;\n  &:before {\n    position: absolute;\n    left: 20px;\n    top: -12px;\n    content: \"\";\n    display: block;\n    border-style: solid;\n    border-width: 0 11.5px 12px 11.5px;\n    border-color: transparent transparent #ffffff transparent;\n  }\n"], ["\n  position: absolute;\n  z-index: 10;\n  max-width: 280px;\n  animation: ", " 0.3s;\n  border-radius: 5px;\n  box-shadow: 0 3px 40px 8px rgba(116,116,116,0.2);\n  padding: 5px 0;\n  color: #767676;\n  background-color: #FFF;\n  &:before {\n    position: absolute;\n    left: 20px;\n    top: -12px;\n    content: \"\";\n    display: block;\n    border-style: solid;\n    border-width: 0 11.5px 12px 11.5px;\n    border-color: transparent transparent #ffffff transparent;\n  }\n"])), fadeIn);
var PositionBtnGroupTop = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  padding: 0 5px 5px 5px;\n"], ["\n  padding: 0 5px 5px 5px;\n"])));
var PositionBtnGroupBottom = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  border-top: 1px solid #ccc;\n  padding: 5px 5px 0 5px;\n"], ["\n  border-top: 1px solid #ccc;\n  padding: 5px 5px 0 5px;\n"])));
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            style: {
                left: 0,
                top: 0
            }
        };
        _this.menuRef = React.createRef();
        return _this;
    }
    Menu.prototype.calculateStyle = function (props) {
        var view = this.props.view;
        var state = view.state;
        var selection = state.selection;
        if (!selection || !selection.empty) {
            return {
                left: -1000,
                top: 0
            };
        }
        var $anchor = selection.$anchor;
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
        else if (dom && dom.offsetHeight) {
            return {
                left: 5,
                top: elementTop + dom.offsetHeight - offsetTop + 20
            };
        }
        else {
            return {
                left: 5,
                top: elementTop - offsetTop + 20
            };
        }
    };
    Menu.prototype.componentDidMount = function () {
        this.setState({
            style: this.calculateStyle(this.props)
        });
    };
    Menu.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState({
            style: this.calculateStyle(nextProps)
        });
    };
    Menu.prototype.getActiveMenu = function () {
        var _a = this.props, menu = _a.menu, view = _a.view;
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
        return (React.createElement(React.Fragment, null));
    };
    Menu.prototype.shouldRenderMenu = function () {
        var _a = this.props, menu = _a.menu, view = _a.view;
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
    Menu.prototype.render = function () {
        var style = this.state.style;
        var _a = this.props, menu = _a.menu, view = _a.view;
        var state = view.state, dispatch = view.dispatch;
        var CustomMenu = this.getActiveMenu();
        var shouldRender = this.shouldRenderMenu();
        if (!shouldRender) {
            return null;
        }
        return (React.createElement(PositionBtnGroup, { style: style, ref: this.menuRef },
            React.createElement(PositionBtnGroupTop, null, menu.map(function (item, key) {
                return (React.createElement(ButtonStyle, { key: key, type: 'button', active: item.active && item.active(state), title: item.title, disabled: item.enable && !item.enable(state), onMouseDown: function (e) {
                        e.preventDefault();
                        item.onClick(state, dispatch, view);
                    } }, item.icon));
            })),
            (CustomMenu && CustomMenu.props && CustomMenu.props.children) &&
                React.createElement(PositionBtnGroupBottom, null, CustomMenu)));
    };
    return Menu;
}(React.Component));
export default Menu;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=menu.js.map