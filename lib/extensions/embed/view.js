"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_components_1 = require("styled-components");
var popup_1 = require("./popup");
var ExternalLink_1 = require("../../components/icons/ExternalLink");
var Button = styled_components_1.default.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: #fff;\n  border: none;\n  color: #adadad;\n  margin-left: 5px;\n  vertical-align: middle;\n"], ["\n  background-color: #fff;\n  border: none;\n  color: #adadad;\n  margin-left: 5px;\n  vertical-align: middle;\n"])));
var useState = React.useState;
exports.default = (function (props) {
    var node = props.node, view = props.view, pos = props.pos;
    var state = view.state, dispatch = view.dispatch;
    var _a = useState(false), showPopup = _a[0], setShowPopup = _a[1];
    if (node.attrs.src.indexOf('youtube') !== -1) {
        var src = node.attrs.src;
        var youtubeId = '';
        var matches = /www\.youtube\.com\/watch\?v=(.*?)$/.exec(src);
        if (matches && matches[1]) {
            youtubeId = matches[1];
        }
        if (!youtubeId) {
            var embedMatches = /www\.youtube\.com\/embed\/(.*?)$/.exec(src);
            if (embedMatches && embedMatches[1]) {
                youtubeId = embedMatches[1];
            }
        }
        if (youtubeId) {
            var url = "https://www.youtube.com/embed/" + youtubeId;
            return (React.createElement("div", { className: "youtube-frame-wrap" },
                React.createElement("div", { className: "youtube-frame" },
                    React.createElement("iframe", { src: url }))));
        }
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "embed-wrap" },
            React.createElement("div", { className: "embed" },
                React.createElement("div", { className: "embed-inner" },
                    node.attrs.src,
                    React.createElement(Button, { onClick: function () {
                            setShowPopup(true);
                        } },
                        React.createElement(ExternalLink_1.default, { style: { width: '16px', height: '16px' } }))))),
        showPopup && (React.createElement(popup_1.default, { url: node.attrs.src, onClose: function () {
                setShowPopup(false);
            }, onDone: function (src) {
                setShowPopup(false);
                dispatch(state.tr.setNodeMarkup(pos, node.type, __assign({}, node.attrs, { src: src })));
            } }))));
});
var templateObject_1;
//# sourceMappingURL=view.js.map