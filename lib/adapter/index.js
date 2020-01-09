"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_dom_1 = require("react-dom");
var smart_block_1 = require("../components/smart-block");
var style_1 = require("../utils/style");
exports.default = (function (item, option) {
    var dom = typeof item === 'string' ? document.querySelector(item) : item;
    react_dom_1.render(React.createElement(React.Fragment, null,
        React.createElement(style_1.default, null),
        React.createElement(smart_block_1.default, __assign({}, option))), dom);
});
//# sourceMappingURL=index.js.map