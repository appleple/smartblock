"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var prosemirror_utils_1 = require("prosemirror-utils");
var utils_1 = require("../utils");
var button_1 = require("./button");
var useState = React.useState, useEffect = React.useEffect;
var getContainerOffset = function (container) {
    return (0, utils_1.getOffset)(container).top;
};
var calculateStyle = function (props) {
    var view = props.view;
    var state = view.state;
    var selection = state.selection;
    if (!selection) {
        return {
            top: -1000
        };
    }
    var $anchor = selection.$anchor;
    var resolvedPos = state.doc.resolve($anchor.pos);
    var rowNumber = resolvedPos.path[1];
    var i = 0;
    if ($anchor.pos === 0) {
        return {
            top: -1000
        };
    }
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
    var offsetTop = getContainerOffset(view.dom);
    if (coords.top === 0) {
        return {
            top: -1000
        };
    }
    return {
        right: 20,
        top: elementTop - offsetTop - 40
    };
};
exports.default = (function (props) {
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
    return (React.createElement("div", { style: style, className: "smartblock-edit-menu" }, menu.map(function (item, key) {
        return (React.createElement(button_1.default, { className: "smartblock-edit-btn", key: "edit-".concat(key), type: "button", color: item.btnColor, active: item.active && item.active(state), disabled: item.enable && !item.enable(state), onClick: function (e) {
                e.preventDefault();
                item.onClick(state, dispatch, view);
            } }, item.icon));
    })));
});
//# sourceMappingURL=edit-menu.js.map