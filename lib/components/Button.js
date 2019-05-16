var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import styled from 'styled-components';
export default styled.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  ", "\n  ", "\n  background: #fff;\n  border: none;\n  appearance: none;\n  -webkit-appearance: none;\n  font-size: 20px;\n  cursor: pointer;\n  padding: 5px 10px;\n  margin-right: 5px;\n  text-align: center;\n"], ["\n  ",
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
var templateObject_1;
//# sourceMappingURL=button.js.map