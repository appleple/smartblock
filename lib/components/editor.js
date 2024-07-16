"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var hooks_1 = require("../utils/hooks");
var useRef = React.useRef, useEffect = React.useEffect;
exports.default = (function (props) {
    var view = (0, hooks_1.useView)(props);
    useEffect(function () {
        if (props.editorRef.current) {
            props.editorRef.current.appendChild(view.dom);
        }
        if (props.autoFocus) {
            view.focus();
        }
    }, []);
    var editor = React.createElement("div", { ref: props.editorRef });
    return props.render({
        editor: editor,
        view: view,
    });
});
//# sourceMappingURL=editor.js.map