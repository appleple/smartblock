"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Check_1 = require("../../components/icons/Check");
exports.default = (function (props) {
    var _a = React.useState(''), url = _a[0], setUrl = _a[1];
    var editing = props.editing;
    React.useEffect(function () {
        setUrl(props.url);
    }, [props.url]);
    if (!editing) {
        return null;
    }
    return (React.createElement("div", { className: "smartblock-tooltip" },
        React.createElement("div", { className: "smartblock-tooltip-inner" },
            React.createElement("input", { className: "smartblock-tooltip-input", type: "text", value: url, placeholder: "https://~", onKeyDown: function (e) {
                    if (e.key === 'Enter') {
                        props.onClick(url);
                    }
                }, onChange: function (e) {
                    setUrl(e.target.value);
                } }),
            React.createElement("button", { className: "smartblock-tooltip-btn", onClick: function () {
                    props.onClick(url);
                }, style: { paddingLeft: '7px' } },
                React.createElement(Check_1.default, { style: { width: '24px', height: '24px', overflow: 'hidden' } })))));
});
//# sourceMappingURL=tooltip-react.js.map