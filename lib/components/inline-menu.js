"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var utils_1 = require("../utils");
var button_1 = require("./button");
var useRef = React.useRef;
var ARROWOFFSET = 50;
var ARROWTOPOFFSET = 25;
var calculateStyle = function (view, container) {
    var selection = view.state.selection;
    var offsetLeft = utils_1.getOffset(view.dom).left;
    var coords = view.coordsAtPos(selection.$head.pos);
    var offsetTop = utils_1.getOffset(view.dom).top;
    var top = coords.top + utils_1.getScrollTop() + ARROWTOPOFFSET - offsetTop;
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
var getActiveInlineMenu = function (props) {
    var blockMenu = props.blockMenu, view = props.view;
    var state = view.state;
    var activeItem = blockMenu.find(function (item) {
        if (item.active && item.active(state)) {
            return true;
        }
        return false;
    });
    if (activeItem && activeItem.customInlineMenu) {
        return React.createElement(React.Fragment, null, activeItem.customInlineMenu(view));
    }
    return false;
};
var calculateArrowPos = function (view, container) {
    var selection = view.state.selection;
    var offsetLeft = utils_1.getOffset(view.dom).left;
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
    var menu = _a.menu, blockMenu = _a.blockMenu, children = _a.children, view = _a.view;
    var state = view.state, dispatch = view.dispatch;
    var selection = view.state.selection;
    var container = useRef(null);
    var style = calculateStyle(view, container);
    var pos = calculateArrowPos(view, container);
    var inlineMenu = getActiveInlineMenu({ blockMenu: blockMenu, view: view });
    if (!selection || selection.empty) {
        return React.createElement(React.Fragment, null);
    }
    if (menu.length === 0) {
        return React.createElement(React.Fragment, null);
    }
    return (React.createElement("div", { style: style, ref: container, className: "smartblock-inline-menu" },
        React.createElement("div", { className: "smartblock-inline-menu-arrow", style: { left: pos + "px" } }),
        React.createElement("div", { className: "smartblock-inline-menu-inner" },
            children,
            menu.map(function (item, key) {
                return (React.createElement(button_1.default, { key: "inline-" + key, type: "button", active: item.active && item.active(state), 
                    // title={item.title}
                    disabled: item.enable && !item.enable(state), onClick: function (e) {
                        e.preventDefault();
                        item.onClick(state, dispatch);
                    } }, typeof item.icon !== 'string' ? (item.icon) : (React.createElement("span", { dangerouslySetInnerHTML: { __html: item.icon } }))));
            }),
            inlineMenu && inlineMenu.props && inlineMenu.props.children && (React.createElement(React.Fragment, null, inlineMenu)))));
};
exports.default = MenuBar;
//# sourceMappingURL=inline-menu.js.map