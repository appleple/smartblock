var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import 'prosemirror-view/style/prosemirror.css';
var Editor = /** @class */ (function (_super) {
    __extends(Editor, _super);
    function Editor(props) {
        var _this = _super.call(this, props) || this;
        _this.editorRef = React.createRef();
        _this.view = new EditorView(null, {
            state: EditorState.create(props.options),
            dispatchTransaction: function (transaction) {
                var _a = _this.view.state.applyTransaction(transaction), state = _a.state, transactions = _a.transactions;
                _this.view.updateState(state);
                if (transactions.some(function (tr) { return tr.docChanged; })) {
                    _this.props.onChange(state, _this.view.dispatch);
                }
                _this.forceUpdate();
            },
            attributes: _this.props.attributes,
            nodeViews: _this.props.nodeViews
        });
        return _this;
    }
    Editor.prototype.componentDidMount = function () {
        this.editorRef.current.appendChild(this.view.dom);
        if (this.props.autoFocus) {
            this.view.focus();
        }
    };
    Editor.prototype.render = function () {
        var editor = React.createElement("div", { ref: this.editorRef });
        return this.props.render ? this.props.render({
            editor: editor,
            view: this.view
        }) : editor;
    };
    return Editor;
}(React.Component));
export default Editor;
//# sourceMappingURL=editor.js.map