"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_components_1 = require("styled-components");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var prosemirror_utils_1 = require("prosemirror-utils");
var map_1 = require("lodash/map");
var fontawesome_free_solid_1 = require("@fortawesome/fontawesome-free-solid");
var util_1 = require("./util");
var fadeIn = styled_components_1.keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n"], ["\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n"])));
var PositionBtnGroup = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: absolute;\n  z-index: 10;\n  max-width: 280px;\n  animation: ", " 0.3s;\n  border-radius: 5px;\n  box-shadow: 0 3px 40px 8px rgba(116,116,116,0.2);\n  padding: 10px 0;\n  overflow: hidden;\n  background-color: #FFF;\n"], ["\n  position: absolute;\n  z-index: 10;\n  max-width: 280px;\n  animation: ", " 0.3s;\n  border-radius: 5px;\n  box-shadow: 0 3px 40px 8px rgba(116,116,116,0.2);\n  padding: 10px 0;\n  overflow: hidden;\n  background-color: #FFF;\n"])), fadeIn);
var ButtonStyle = styled_components_1.default.button(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  ", "\n  ", "\n  background: #fff;\n  border: none;\n  appearance: none;\n  -webkit-appearance: none;\n  font-size: 20px;\n  cursor: pointer;\n  padding: 5px 10px;\n  margin-right: 5px;\n  text-align: center;\n"], ["\n  ",
    "\n  ",
    "\n  background: #fff;\n  border: none;\n  appearance: none;\n  -webkit-appearance: none;\n  font-size: 20px;\n  cursor: pointer;\n  padding: 5px 10px;\n  margin-right: 5px;\n  text-align: center;\n"])), function (props) {
    if (props.active) {
        return "\n        color: blue;\n      ";
    }
    else {
        return "\n      color: #777;\n      ";
    }
}, function (props) {
    if (props.disabled) {
        return "\n        opacity: .4;\n      ";
    }
});
var Button = function (_a) {
    var state = _a.state, dispatch = _a.dispatch;
    return function (item, key) {
        return (React.createElement(ButtonStyle, { key: key, type: 'button', active: item.active && item.active(state), title: item.title, disabled: item.enable && !item.enable(state), onMouseDown: function (e) {
                e.preventDefault();
                item.onClick(state, dispatch);
            } }, item.icon));
    };
};
var findNodePosition = function (doc, target) {
    var ret = -1;
    doc.descendants(function (node, pos) {
        if (node.eq(target)) {
            ret = pos;
        }
    });
    return ret;
};
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
        var firstNode = prosemirror_utils_1.findChildren(state.doc, function (_node) {
            if (rowNumber === i || rowNumber + 1 === i) {
                i++;
                return true;
            }
            i++;
            return false;
        }, false)[0];
        var coords = view.coordsAtPos(firstNode.pos);
        var dom = view.nodeDOM(firstNode.pos);
        var elementTop = util_1.getOffset(dom).top;
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
    PositionBtns.prototype.moveSectionDown = function () {
        var view = this.props.view;
        var state = view.state;
        var selection = state.selection;
        var $anchor = selection.$anchor;
        var resolvedPos = state.doc.resolve($anchor.pos);
        var rowNumber = resolvedPos.path[1];
        var i = 0;
        var _a = prosemirror_utils_1.findChildren(state.doc, function (_node) {
            if (rowNumber === i || rowNumber + 1 === i) {
                i++;
                return true;
            }
            i++;
            return false;
        }, false), firstNode = _a[0], secondNode = _a[1];
        if (secondNode) {
            var firstIndex = firstNode.pos;
            var secondIndex = secondNode.pos;
            var removeTransaction = state.tr.delete(firstIndex, secondIndex);
            view.dispatch(removeTransaction);
            var firstNode2 = removeTransaction.doc.content.child(rowNumber);
            var firstIndex2 = findNodePosition(removeTransaction.doc, firstNode2);
            var insertTransaction = view.state.tr.insert(firstIndex2 + firstNode2.nodeSize, firstNode.node);
            view.dispatch(insertTransaction);
            view.dispatch(prosemirror_utils_1.setTextSelection(firstIndex2 + firstNode2.nodeSize)(view.state.tr));
            view.state.tr.scrollIntoView();
        }
    };
    PositionBtns.prototype.deleteSelection = function () {
        var view = this.props.view;
        var state = view.state;
        var selection = state.selection;
        var $anchor = selection.$anchor;
        var resolvedPos = state.doc.resolve($anchor.pos);
        var rowNumber = resolvedPos.path[1];
        var i = 0;
        var firstNode = prosemirror_utils_1.findChildren(state.doc, function (_node) {
            if (rowNumber === i) {
                i++;
                return true;
            }
            i++;
            return false;
        }, false)[0];
        var firstIndex = firstNode.pos;
        var removeTransaction = state.tr.delete(firstIndex, firstIndex + firstNode.node.content.size + 2);
        view.dispatch(removeTransaction);
    };
    PositionBtns.prototype.moveSectionUp = function () {
        var view = this.props.view;
        var state = view.state;
        var selection = state.selection;
        var $anchor = selection.$anchor;
        var resolvedPos = state.doc.resolve($anchor.pos);
        var rowNumber = resolvedPos.path[1];
        var i = 0;
        var _a = prosemirror_utils_1.findChildren(state.doc, function (_node) {
            if (rowNumber === i || rowNumber - 1 === i) {
                i++;
                return true;
            }
            i++;
            return false;
        }, false), firstNode = _a[0], secondNode = _a[1];
        if (firstNode) {
            var firstIndex = firstNode.pos;
            var secondIndex = secondNode.pos;
            var removeTransaction = state.tr.delete(firstIndex, secondIndex);
            view.dispatch(removeTransaction);
            var firstNode2 = removeTransaction.doc.content.child(rowNumber - 1);
            var firstIndex2 = findNodePosition(removeTransaction.doc, firstNode2);
            var insertTransaction = view.state.tr.insert(firstIndex2 + firstNode2.nodeSize, firstNode.node);
            view.dispatch(insertTransaction);
            view.dispatch(prosemirror_utils_1.setTextSelection(firstIndex2)(view.state.tr));
            view.state.tr.scrollIntoView();
        }
    };
    PositionBtns.prototype.render = function () {
        var style = this.state.style;
        var _a = this.props, menu = _a.menu, view = _a.view;
        return (React.createElement(PositionBtnGroup, { style: style, ref: this.menuRef },
            map_1.default(menu, function (item, key) { return (React.createElement("span", { key: key }, map_1.default(item, Button(view)))); }),
            React.createElement(ButtonStyle, { onClick: this.moveSectionUp.bind(this) },
                React.createElement(react_fontawesome_1.default, { icon: fontawesome_free_solid_1.faArrowUp })),
            React.createElement(ButtonStyle, { onClick: this.moveSectionDown.bind(this) },
                React.createElement(react_fontawesome_1.default, { icon: fontawesome_free_solid_1.faArrowDown })),
            React.createElement(ButtonStyle, { onClick: this.deleteSelection.bind(this) },
                React.createElement(react_fontawesome_1.default, { icon: fontawesome_free_solid_1.faTrash }))));
    };
    return PositionBtns;
}(React.Component));
exports.default = PositionBtns;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=menu.js.map