"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var hooks_1 = require("../utils/hooks");
var useRef = React.useRef, useEffect = React.useEffect;
exports.default = (function (props) {
    var editorRef = useRef(null);
    var view = hooks_1.useView(props);
    // Object.keys(props.options).forEach((key) => console.log(key, {...props.options[key]}))
    useEffect(function () {
        editorRef.current.appendChild(view.dom);
        if (props.autoFocus) {
            view.focus();
        }
    }, []);
    var scrolling = hooks_1.useScrolling(editorRef, 300);
    var editor = React.createElement("div", { ref: editorRef });
    return props.render({
        editor: editor,
        view: view,
        scrolling: scrolling
    });
});
//# sourceMappingURL=editor.js.map