"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_components_1 = require("styled-components");
var Check_1 = require("../../components/icons/Check");
var Tooltip = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  color: #777;\n  font-size: 16px;\n  box-shadow: 0 3px 40px 8px rgba(116, 116, 116, 0.2);\n  border-radius: 3px;\n  width: 320px;\n  line-height: 46px;\n  display: block;\n"], ["\n  color: #777;\n  font-size: 16px;\n  box-shadow: 0 3px 40px 8px rgba(116, 116, 116, 0.2);\n  border-radius: 3px;\n  width: 320px;\n  line-height: 46px;\n  display: block;\n"])));
var TooltipInner = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  height: 46px;\n  border-radius: 3px;\n  overflow: hidden;\n"], ["\n  display: flex;\n  height: 46px;\n  border-radius: 3px;\n  overflow: hidden;\n"])));
var Input = styled_components_1.default.input(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  border: none;\n  display: block;\n  padding: 0 10px;\n  font-size: 16px;\n  flex: 1;\n  &:focus {\n    outline: none;\n  }\n"], ["\n  border: none;\n  display: block;\n  padding: 0 10px;\n  font-size: 16px;\n  flex: 1;\n  &:focus {\n    outline: none;\n  }\n"])));
var Button = styled_components_1.default.button(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  border: none;\n  background-color: #014cc5;\n  width: 46px;\n  color: #fff;\n  font-size: 16px;\n  cursor: pointer;\n"], ["\n  border: none;\n  background-color: #014cc5;\n  width: 46px;\n  color: #fff;\n  font-size: 16px;\n  cursor: pointer;\n"])));
exports.default = (function (props) {
    var _a = React.useState(''), url = _a[0], setUrl = _a[1];
    var editing = props.editing;
    React.useEffect(function () {
        setUrl(props.url);
    }, [props.url]);
    if (!editing) {
        return null;
    }
    return (React.createElement(Tooltip, null,
        React.createElement(TooltipInner, null,
            React.createElement(Input, { type: "text", value: url, placeholder: "https://~", onKeyDown: function (e) {
                    if (e.key === 'Enter') {
                        props.onClick(url);
                    }
                }, onChange: function (e) {
                    setUrl(e.target.value);
                } }),
            React.createElement(Button, { onClick: function () {
                    props.onClick(url);
                }, style: { paddingLeft: '7px' } },
                React.createElement(Check_1.default, { style: { width: '24px', height: '24px', overflow: 'hidden' } })))));
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=tooltip-react.js.map