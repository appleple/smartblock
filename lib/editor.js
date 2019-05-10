"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_view_1 = require("prosemirror-view");
require("prosemirror-view/style/prosemirror.css");
var Editor = /** @class */ (function (_super) {
    __extends(Editor, _super);
    function Editor(props) {
        var _this = _super.call(this, props) || this;
        _this.editorRef = React.createRef();
        _this.view = new prosemirror_view_1.EditorView(null, {
            state: prosemirror_state_1.EditorState.create(props.options),
            dispatchTransaction: function (transaction) {
                var _a = _this.view.state.applyTransaction(transaction), state = _a.state, transactions = _a.transactions;
                _this.view.updateState(state);
                if (transactions.some(function (tr) { return tr.docChanged; })) {
                    _this.props.onChange(state.doc);
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
exports.default = Editor;
//# sourceMappingURL=editor.js.map