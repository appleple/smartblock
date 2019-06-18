import * as React from 'react';
import { useView } from '../utils/hooks';
var useRef = React.useRef, useEffect = React.useEffect;
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
    var editor = React.createElement("div", { ref: editorRef });
    return props.render
        ? props.render({
            editor: editor,
            view: view
        })
        : editor;
});
//# sourceMappingURL=editor.js.map