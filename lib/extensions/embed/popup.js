var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import * as React from 'react';
import styled from 'styled-components';
import CheckIcon from '../../components/icons/Check';
var PopupText = styled.p(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  text-align: center;\n  color: #666;\n  text-align: center;\n  margin-bottom: 15px;\n  font-size: 14px;\n"], ["\n  text-align: center;\n  color: #666;\n  text-align: center;\n  margin-bottom: 15px;\n  font-size: 14px;\n"])));
var Popup = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 10;\n"], ["\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 10;\n"])));
var PopupInnder = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  flex-basis: 380px;\n  background: #FFF;\n  border-radius: 5px;\n  box-shadow: 0 3px 40px 8px rgba(116, 116, 116, 0.6);\n  padding: 10px;\n  box-sizing: border-box;\n  input {\n    font-size: 14px;\n    line-height: 30px;\n    display: block;\n    width: 100%;\n    box-sizing: border-box;\n    border-radius: 5px;\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n    border: 1px solid #eee;\n    padding: 0 5px;\n  }\n"], ["\n  flex-basis: 380px;\n  background: #FFF;\n  border-radius: 5px;\n  box-shadow: 0 3px 40px 8px rgba(116, 116, 116, 0.6);\n  padding: 10px;\n  box-sizing: border-box;\n  input {\n    font-size: 14px;\n    line-height: 30px;\n    display: block;\n    width: 100%;\n    box-sizing: border-box;\n    border-radius: 5px;\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n    border: 1px solid #eee;\n    padding: 0 5px;\n  }\n"])));
var PopupTextField = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n"], ["\n  display: flex;\n"])));
var Button = styled.button(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  border: none;\n  background-color: #014cc5;\n  width: 46px;\n  color: #fff;\n  font-size: 16px;\n  cursor: pointer;\n  border-radius: 5px;\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n"], ["\n  border: none;\n  background-color: #014cc5;\n  width: 46px;\n  color: #fff;\n  font-size: 16px;\n  cursor: pointer;\n  border-radius: 5px;\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n"])));
var useState = React.useState, useEffect = React.useEffect, useRef = React.useRef;
export default (function (props) {
    var _a = useState(''), url = _a[0], setUrl = _a[1];
    var input = useRef();
    useEffect(function () {
        input.current.focus();
    });
    return (React.createElement(Popup, { id: "popup", onClick: function (e) {
            var target = e.target;
            if (target.id === "popup" && props.onClose) {
                props.onClose();
            }
        } },
        React.createElement(PopupInnder, null,
            React.createElement(PopupText, null, "\u57CB\u3081\u8FBC\u307F\u30EA\u30F3\u30AF\u7528\u306EURL\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044"),
            React.createElement(PopupTextField, null,
                React.createElement("input", { ref: input, type: "text", value: url, placeholder: "https://", onKeyDown: function (e) {
                        if (e.keyCode === 13 && props.onDone) {
                            props.onDone(url);
                        }
                    }, onChange: function (e) {
                        setUrl(e.target.value);
                    } }),
                React.createElement(Button, { onClick: function (e) {
                        if (props.onDone) {
                            props.onDone(url);
                        }
                    } },
                    React.createElement(CheckIcon, { style: { width: '24px', height: '24px', overflow: 'hidden' } }))))));
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=popup.js.map