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
var PositionBtnGroup = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: absolute;\n  z-index: 10;\n  max-width: 280px;\n  animation: ", " 0.3s;\n  border-radius: 5px;\n  box-shadow: 0 3px 40px 8px rgba(116,116,116,0.2);\n  padding: 10px 0;\n  overflow: hidden;\n  background-color: #FFF;\n"], ["\n  position: absolute;\n  z-index: 10;\n  max-width: 280px;\n  animation: ", " 0.3s;\n  border-radius: 5px;\n  box-shadow: 0 3px 40px 8px rgba(116,116,116,0.2);\n  padding: 10px 0;\n  overflow: hidden;\n  background-color: #FFF;\n"])), fadeIn);
var Button = function (view) { return function (item, key) {
    var state = view.state, dispatch = view.dispatch;
    return (React.createElement(ButtonStyle, { key: key, type: 'button', active: item.active && item.active(state), title: item.title, disabled: item.enable && !item.enable(state), onMouseDown: function (e) {
            e.preventDefault();
            item.onClick(state, dispatch, view);
        } }, item.icon));
}; };
var PositionBtns = /** @class */ (function (_super) {
    __extends(PositionBtns, _super);
    function PositionBtns(props) {
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
    PositionBtns.prototype.calculateStyle = function (props) {
        var view = this.props.view;
        var state = view.state;
        var selection = state.selection;
        if (!selection) {
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
        if (coords.top === 0) {
            return {
                top: -1000
            };
        }
        else if (dom && dom.offsetHeight) {
            return {
                right: 0,
                top: elementTop + dom.offsetHeight
            };
        }
        else {
            return {
                right: 0,
                top: elementTop
            };
        }
    };
    PositionBtns.prototype.componentDidMount = function () {
        this.setState({
            style: this.calculateStyle(this.props)
        });
    };
    PositionBtns.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState({
            style: this.calculateStyle(nextProps)
        });
    };
    PositionBtns.prototype.getActiveMenu = function () {
        var _a = this.props, menu = _a.menu, view = _a.view;
        var state = view.state;
        var activeItem = menu.blocks.find(function (item) {
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
    PositionBtns.prototype.render = function () {
        var style = this.state.style;
        var _a = this.props, menu = _a.menu, view = _a.view;
        var CustomMenu = this.getActiveMenu();
        return (React.createElement(PositionBtnGroup, { style: style, ref: this.menuRef },
            map(menu, function (item, key) { return (React.createElement("span", { key: key }, map(item, Button(view)))); }),
            (CustomMenu && CustomMenu.props && CustomMenu.props.children) &&
                React.createElement("div", { style: { borderTop: '1px solid #CCC', paddingTop: '10px' } }, CustomMenu)));
    };
    return PositionBtns;
}(React.Component));
export default PositionBtns;
var templateObject_1, templateObject_2;
//# sourceMappingURL=menu.js.map