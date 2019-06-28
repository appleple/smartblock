import * as React from 'react';
import { useView, useScrolling } from '../utils/hooks';
var useRef = React.useRef, useEffect = React.useEffect, useState = React.useState;
export default (function (props) {
    var editorRef = useRef(null);
    var view = useView(props);
    // Object.keys(props.options).forEach((key) => console.log(key, {...props.options[key]}))
    useEffect(function () {
        editorRef.current.appendChild(view.dom);
        if (props.autoFocus) {
            view.focus();
        }
    }, []);
    var scrolling = useScrolling(300);
    var editor = React.createElement("div", { ref: editorRef });
    return props.render({
        editor: editor,
        view: view,
        scrolling: scrolling
    });
});
//# sourceMappingURL=editor.js.map