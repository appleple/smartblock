var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import styled from 'styled-components';
var Button = styled.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  ", "\n  ", "\n  ", "\n\n  width: 36px;\n  height: 36px;\n  border: none;\n  border-radius: 3px;\n  appearance: none;\n  -webkit-appearance: none;\n  font-size: 20px;\n  cursor: pointer;\n  padding: 5px;\n  margin-right: 5px;\n  text-align: center;\n  svg {\n    fill: currentColor;\n  }\n  &:last-child {\n    margin-right: 0;\n  }\n  &:not([disabled]):hover {\n    color: #333;\n  }\n  \n  &[disabled]:hover {\n    cursor: not-allowed;\n  }\n"], ["\n  ",
    "\n  ",
    "\n  ",
    "\n\n  width: 36px;\n  height: 36px;\n  border: none;\n  border-radius: 3px;\n  appearance: none;\n  -webkit-appearance: none;\n  font-size: 20px;\n  cursor: pointer;\n  padding: 5px;\n  margin-right: 5px;\n  text-align: center;\n  svg {\n    fill: currentColor;\n  }\n  &:last-child {\n    margin-right: 0;\n  }\n  &:not([disabled]):hover {\n    color: #333;\n  }\n  \n  &[disabled]:hover {\n    cursor: not-allowed;\n  }\n"])), function (props) {
    if (props.disabled) {
        return "\n        opacity: .4;\n      ";
    }
}, function (props) {
    if (props.active) {
        return "\n        color: #005CEE;\n        opacity: 1;\n        background-color: #F2F2F4;\n      ";
    }
    else {
        return "\n        color: #777;\n        background: #fff;\n      ";
    }
}, function (props) {
    if (props.color === 'black') {
        return "\n        background-color: #333333 !important;\n        color: #FFF;\n      ";
    }
});
export default Button;
var templateObject_1;
//# sourceMappingURL=button.js.map