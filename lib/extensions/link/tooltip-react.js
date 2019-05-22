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
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/fontawesome-free-solid';
import styled from 'styled-components';
var Tooltip = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: absolute;\n  display: inline-block;\n  z-index: 1000;\n  background-color: #FFF;\n  color: #777;\n  padding: 5px;\n  font-size: 16px;\n  box-shadow: 0 3px 40px 8px rgba(116,116,116,0.2);\n  border-radius: 5px;\n  width: 250px;\n  input {\n    font-size: 16px;\n  }\n"], ["\n  position: absolute;\n  display: inline-block;\n  z-index: 1000;\n  background-color: #FFF;\n  color: #777;\n  padding: 5px;\n  font-size: 16px;\n  box-shadow: 0 3px 40px 8px rgba(116,116,116,0.2);\n  border-radius: 5px;\n  width: 250px;\n  input {\n    font-size: 16px;\n  }\n"])));
var Button = styled.button(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  border: none;\n  background-color: #FFF;\n  color: #777;\n  margin-left: 5px;\n  font-size: 16px;\n"], ["\n  border: none;\n  background-color: #FFF;\n  color: #777;\n  margin-left: 5px;\n  font-size: 16px;\n"])));
var Label = styled.label(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: inline-block;\n  width: 200px;\n"], ["\n  display: inline-block;\n  width: 200px;\n"])));
var TooltipReact = /** @class */ (function (_super) {
    __extends(TooltipReact, _super);
    function TooltipReact(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            newUrl: props.url,
            editing: false
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
        var style = this.props.style;
        var _a = this.state, newUrl = _a.newUrl, editing = _a.editing;
        return (React.createElement(Tooltip, { style: style },
            editing && React.createElement(React.Fragment, null,
                React.createElement("input", { type: "text", value: newUrl, placeholder: "https://", onChange: function (e) {
                        _this.setState({
                            newUrl: e.target.value
                        });
                    } }),
                React.createElement(Button, { onClick: function () {
                        _this.setState({
                            editing: false
                        });
                        _this.props.onClick(_this.state.newUrl);
                    } }, "OK")),
            !editing && React.createElement(React.Fragment, null,
                React.createElement(Label, null, newUrl),
                React.createElement(Button, { onClick: function () {
                        _this.setState({
                            editing: true
                        });
                    } },
                    React.createElement(FontAwesomeIcon, { icon: faEdit })))));
    };
    return TooltipReact;
}(React.Component));
export default TooltipReact;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=tooltip-react.js.map