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
import map from 'lodash/map';
import { getOffset } from '../utils';
import ButtonStyle from './button';
var fadeIn = keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n"], ["\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n"])));
var PositionBtnGroup = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: absolute;\n  right: 0;\n  z-index: 10;\n  max-width: 280px;\n  animation: ", " 0.3s;\n  border-radius: 5px;\n  padding: 5px 0;\n  background-color: #F2F2F4;\n"], ["\n  position: absolute;\n  right: 0;\n  z-index: 10;\n  max-width: 280px;\n  animation: ", " 0.3s;\n  border-radius: 5px;\n  padding: 5px 0;\n  background-color: #F2F2F4;\n"])), fadeIn);
var Button = function (view) { return function (item, key) {
    var state = view.state, dispatch = view.dispatch;
    return (React.createElement(ButtonStyle, { style: { backgroundColor: 'transparent' }, key: key, type: 'button', active: item.active && item.active(state), title: item.title, disabled: item.enable && !item.enable(state), onMouseDown: function (e) {
            e.preventDefault();
            item.onClick(state, dispatch, view);
        } }, item.icon));
}; };
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            style: {
                right: 20,
                top: 0
            }
        };
        _this.menuRef = React.createRef();
        return _this;
    }
    Menu.prototype.calculateStyle = function (props) {
        var _a = this.props, view = _a.view, offsetTop = _a.offsetTop;
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
        if (coords.top === 0) {
            return {
                top: -1000
            };
        }
        else {
            return {
                right: 20,
                top: elementTop - offsetTop - 45
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
    Menu.prototype.render = function () {
        var style = this.state.style;
        var _a = this.props, menu = _a.menu, view = _a.view;
        return (React.createElement(PositionBtnGroup, { style: style, ref: this.menuRef }, map(menu, function (item, key) { return (React.createElement("span", { key: key }, map(item, Button(view)))); })));
    };
    return Menu;
}(React.Component));
export default Menu;
var templateObject_1, templateObject_2;
//# sourceMappingURL=edit-menu.js.map