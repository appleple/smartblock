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
import * as React from 'react';
import styled from 'styled-components';
import CheckIcon from '../../components/icons/Check';
var Tooltip = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: absolute;\n  display: inline-block;\n  z-index: 1000;\n  background-color: #fff;\n  color: #777;\n  font-size: 16px;\n  box-shadow: 0 3px 40px 8px rgba(116, 116, 116, 0.2);\n  border-radius: 3px;\n  width: 320px;\n  line-height: 46px;\n  display: block;\n  &:before {\n    position: absolute;\n    left: 20px;\n    top: -12px;\n    content: '';\n    display: block;\n    border-style: solid;\n    border-width: 0 12px 12px 12px;\n    border-color: transparent transparent #ffffff transparent;\n  }\n"], ["\n  position: absolute;\n  display: inline-block;\n  z-index: 1000;\n  background-color: #fff;\n  color: #777;\n  font-size: 16px;\n  box-shadow: 0 3px 40px 8px rgba(116, 116, 116, 0.2);\n  border-radius: 3px;\n  width: 320px;\n  line-height: 46px;\n  display: block;\n  &:before {\n    position: absolute;\n    left: 20px;\n    top: -12px;\n    content: '';\n    display: block;\n    border-style: solid;\n    border-width: 0 12px 12px 12px;\n    border-color: transparent transparent #ffffff transparent;\n  }\n"])));
var TooltipInner = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  height: 46px;\n  border-radius: 3px;\n  overflow: hidden;\n"], ["\n  display: flex;\n  height: 46px;\n  border-radius: 3px;\n  overflow: hidden;\n"])));
var Input = styled.input(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  border: none;\n  display: block;\n  padding: 0 10px;\n  font-size: 16px;\n  flex: 1;\n  &:focus {\n    outline: none;\n  }\n"], ["\n  border: none;\n  display: block;\n  padding: 0 10px;\n  font-size: 16px;\n  flex: 1;\n  &:focus {\n    outline: none;\n  }\n"])));
var Button = styled.button(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  border: none;\n  background-color: #014cc5;\n  width: 46px;\n  color: #fff;\n  font-size: 16px;\n  cursor: pointer;\n"], ["\n  border: none;\n  background-color: #014cc5;\n  width: 46px;\n  color: #fff;\n  font-size: 16px;\n  cursor: pointer;\n"])));
var TooltipReact = /** @class */ (function (_super) {
    __extends(TooltipReact, _super);
    function TooltipReact(props) {
        var _this = _super.call(this, props) || this;
        _this.enterUrl = function () {
            _this.props.onClick(_this.state.newUrl);
        };
        _this.state = {
            newUrl: props.url
        };
        return _this;
    }
    TooltipReact.prototype.componentWillReceiveProps = function (nextProps, prevProps) {
        if (nextProps.url !== prevProps.url) {
            this.setState({
                newUrl: nextProps.url
            });
        }
    };
    TooltipReact.prototype.render = function () {
        var _this = this;
        var _a = this.props, style = _a.style, editing = _a.editing;
        var newUrl = this.state.newUrl;
        if (!editing) {
            return null;
        }
        return (React.createElement(Tooltip, { style: style },
            React.createElement(TooltipInner, null,
                React.createElement(Input, { type: "text", value: newUrl, placeholder: "\u4F8B\uFF09https://\u301C", onKeyDown: function (e) {
                        if (e.key === 'Enter') {
                            _this.enterUrl();
                        }
                    }, onChange: function (e) {
                        _this.setState({
                            newUrl: e.target.value
                        });
                    } }),
                React.createElement(Button, { onClick: this.enterUrl, style: { paddingLeft: '7px' } },
                    React.createElement(CheckIcon, { style: { width: '24px', height: '24px', overflow: 'hidden' } })))));
    };
    TooltipReact.defaultProps = {
        editing: false
    };
    return TooltipReact;
}(React.Component));
export default TooltipReact;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=tooltip-react.js.map