"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
exports.default = (function (props) {
    if (props.tag === 'label') {
        return React.createElement("label", { style: props.style, className: classnames_1.default(props.className, 'smartblock-btn', {
                'is-active': props.active,
                'is-black': props.color === 'black',
                'is-disabled': props.disabled
            }) }, props.children);
    }
    return React.createElement("button", { type: props.type, style: props.style, onClick: props.onClick, className: classnames_1.default(props.className, 'smartblock-btn', {
            'is-active': props.active,
            'is-black': props.color === 'black',
            'is-disabled': props.disabled
        }) }, props.children);
});
//# sourceMappingURL=button.js.map