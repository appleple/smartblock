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
import * as React from "react";
var SvgBack = function (props) { return (React.createElement("svg", __assign({ width: 62, height: 62, viewBox: "0 0 62 62" }, props),
    React.createElement("defs", null,
        React.createElement("filter", { id: "\\u9577\\u65B9\\u5F62_361", x: 0, y: 0, width: 62, height: 62, filterUnits: "userSpaceOnUse" },
            React.createElement("feOffset", { dy: 3, input: "SourceAlpha" }),
            React.createElement("feGaussianBlur", { stdDeviation: 3, result: "blur" }),
            React.createElement("feFlood", { floodOpacity: 0.161 }),
            React.createElement("feComposite", { operator: "in", in2: "blur" }),
            React.createElement("feComposite", { in: "SourceGraphic" }))),
    React.createElement("g", { transform: "matrix(1, 0, 0, 1, 0, 0)", filter: "url(#\\u9577\\u65B9\\u5F62_361)" },
        React.createElement("rect", { id: "\\u9577\\u65B9\\u5F62_361-2", "data-name": "\\u9577\\u65B9\\u5F62 361", width: 44, height: 44, rx: 2, transform: "translate(9 6)", fill: "#f2f2f4" })))); };
export default SvgBack;
//# sourceMappingURL=Back.js.map