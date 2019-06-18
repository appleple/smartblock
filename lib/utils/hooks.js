import * as React from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
var useMemo = React.useMemo, useState = React.useState;
export var useForceUpdate = function () {
    var _a = useState(0), setTick = _a[1];
    var update = function () {
        setTick(function (tick) { return tick + 1; });
    };
    return update;
};
export var useView = function (props) {
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
//# sourceMappingURL=hooks.js.map