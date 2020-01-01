"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_components_1 = require("styled-components");
var agnosticStyled = styled_components_1.default(function (_a) {
    var _b = _a.tag, tag = _b === void 0 ? 'button' : _b, children = _a.children, props = __rest(_a, ["tag", "children"]);
    return React.createElement(tag, props, children);
});
exports.default = agnosticStyled(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  ", "\n  ", "\n  ", "\n\n  width: 36px;\n  height: 36px;\n  border: none;\n  margin-right: 5px;\n  padding: 5px;\n  border-radius: 3px;\n  appearance: none;\n  -webkit-appearance: none;\n  font-size: 20px;\n  cursor: pointer;\n  text-align: center;\n  border: 1px solid transparent;\n  \n  svg {\n    fill: currentColor;\n  }\n  &:last-child {\n    margin-right: 0;\n  }\n  &:not([disabled]):hover {\n    color: #005CEE;\n  }\n  \n  &[disabled]:hover {\n    cursor: not-allowed;\n  }\n"], ["\n  ",
    "\n  ",
    "\n  ",
    "\n\n  width: 36px;\n  height: 36px;\n  border: none;\n  margin-right: 5px;\n  padding: 5px;\n  border-radius: 3px;\n  appearance: none;\n  -webkit-appearance: none;\n  font-size: 20px;\n  cursor: pointer;\n  text-align: center;\n  border: 1px solid transparent;\n  \n  svg {\n    fill: currentColor;\n  }\n  &:last-child {\n    margin-right: 0;\n  }\n  &:not([disabled]):hover {\n    color: #005CEE;\n  }\n  \n  &[disabled]:hover {\n    cursor: not-allowed;\n  }\n"])), function (props) {
    if (props.disabled) {
        return "\n        opacity: .4;\n      ";
    }
}, function (props) {
    if (props.active) {
        return "\n        color: #005CEE;\n        opacity: 1;\n        background-color: #F2F2F4;\n        \n        &:focus {\n          outline: 0;\n          color: #005CEE;\n          background-color: #F2F2F4;\n        }\n        \n      ";
    }
    return "\n        color: #777;\n        background: #fff;\n        \n        &:focus {\n          outline: 0;\n          color: #777;\n          background: #fff;\n        }\n      ";
}, function (props) {
    if (props.color === 'black') {
        return "\n        background-color: #333333 !important;\n        color: #FFF;\n      ";
    }
});
var templateObject_1;
//# sourceMappingURL=button.js.map