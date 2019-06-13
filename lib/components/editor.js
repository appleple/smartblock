import * as React from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import 'prosemirror-view/style/prosemirror.css';
var useMemo = React.useMemo, useRef = React.useRef, useEffect = React.useEffect, useState = React.useState;
var useForceUpdate = function () {
    var _a = useState(0), setTick = _a[1];
    var update = function () {
        setTick(function (tick) { return tick + 1; });
    };
    return update;
};
var useView = function (props) {
    var forceUpdate = useForceUpdate();
    var instance = useMemo(function () {
        var view = new EditorView(null, {
            state: EditorState.create(props.options),
            dispatchTransaction: function (transaction) {
                var _a = view.state.applyTransaction(transaction), state = _a.state, transactions = _a.transactions;
                view.updateState(state);
                if (transactions.some(function (tr) { return tr.docChanged; })) {
                    props.onChange(state, view.dispatch);
                }
                forceUpdate();
            },
            attributes: props.attributes,
            nodeViews: props.nodeViews
        });
        props.onChange(view.state, view.dispatch);
        return view;
    }, []);
    return instance;
};
export default (function (props) {
    var editorRef = useRef(null);
    var view = useView(props);
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