"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var prosemirror_utils_1 = require("prosemirror-utils");
var utils_1 = require("../utils");
var button_1 = require("./button");
var useState = React.useState, useEffect = React.useEffect;
var calculateStyle = function (props) {
    var view = props.view;
    var state = view.state;
    var selection = state.selection;
    if (!selection || !selection.empty) {
        return {
            top: -1000,
            right: 0
        };
    }
    var $anchor = selection.$anchor;
    if ($anchor.pos === 0) {
        return {
            top: -1000,
            right: 0
        };
    }
    var resolvedPos = state.doc.resolve($anchor.pos);
    var rowNumber = resolvedPos.path[1];
    var i = 0;
    var firstNode = (0, prosemirror_utils_1.findChildren)(state.doc, function (_node) {
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
    var elementTop = (0, utils_1.getOffset)(dom).top;
    var offsetTop = (0, utils_1.getOffset)(view.dom).top;
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
    var node = (0, utils_1.getParentNodeFromState)(view.state);
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
exports.default = (function (props) {
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
    var hideMenuOnFocus = false;
    var activeItem = menu.find(function (item) {
        if (item.active && item.active(state)) {
            return true;
        }
        return false;
    });
    if (activeItem && activeItem.hideBlockMenuOnFocus) {
        hideMenuOnFocus = true;
    }
    return (React.createElement("div", { style: style, className: "smartblock-menu" },
        React.createElement("div", { className: "smartblock-menu-top" }, menu.map(function (item, key) {
            if (item.customButton) {
                return React.cloneElement(item.customButton({ state: state, dispatch: dispatch }), { key: key });
            }
            return (React.createElement(button_1.default, { key: key, type: "button", active: item.active && item.active(state), disabled: (item.enable && !item.enable(state)) || hideMenuOnFocus, onClick: function (e) {
                    e.preventDefault();
                    item.onClick(state, dispatch, view);
                } }, typeof item.icon !== 'string' ? (item.icon) : (React.createElement("span", { dangerouslySetInnerHTML: { __html: item.icon } }))));
        })),
        CustomMenu && CustomMenu.props && CustomMenu.props.children && (React.createElement("div", { className: "smartblock-custom-menu" }, CustomMenu))));
});
//# sourceMappingURL=menu.js.map