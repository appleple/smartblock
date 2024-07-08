"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_dom_1 = require("react-dom");
var check_1 = require("../../components/icons/check");
var useState = React.useState, useEffect = React.useEffect, useRef = React.useRef;
function usePortal() {
    var rootElemRef = React.useRef(document.createElement('div'));
    useEffect(function setupElement() {
        // Look for existing target dom element to append to
        var parentElem = document.createElement('div');
        document.body.appendChild(parentElem);
        // Add the detached element to the parent
        parentElem.appendChild(rootElemRef.current);
        // This function is run on unmount
        return function removeElement() {
            parentElem.removeChild(rootElemRef.current);
        };
    }, []);
    return rootElemRef.current;
}
var Modal = function (props) {
    var target = usePortal();
    return (0, react_dom_1.createPortal)(props.children, target);
};
exports.default = (function (props) {
    var _a = useState(props.url), url = _a[0], setUrl = _a[1];
    var input = useRef();
    useEffect(function () {
        input.current.focus();
    });
    return (React.createElement(Modal, null,
        React.createElement("div", { className: "smartblock-popup", id: "smartblock-popup", onClick: function (e) {
                var target = e.target;
                if (target.id === 'smartblock-popup' && props.onClose) {
                    props.onClose();
                }
            } },
            React.createElement("div", { className: "smartblock-popup-inner" },
                React.createElement("div", { className: "smartblock-popup-text" }, "Enter URL here..."),
                React.createElement("div", { className: "smartblock-popup-field" },
                    React.createElement("input", { ref: input, type: "text", value: url, placeholder: "https://", onKeyDown: function (e) {
                            if (e.keyCode === 13 && props.onDone) {
                                props.onDone(url);
                            }
                        }, onChange: function (e) {
                            setUrl(e.target.value);
                        } }),
                    React.createElement("button", { className: "smartblock-popup-btn", onClick: function (e) {
                            if (props.onDone) {
                                props.onDone(url);
                            }
                        } },
                        React.createElement(check_1.default, { style: { width: '24px', height: '24px', overflow: 'hidden' } })))))));
});
//# sourceMappingURL=popup.js.map