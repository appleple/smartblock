import CodeMirror from "codemirror";
import { exitCode } from "prosemirror-commands";
import { undo, redo } from "prosemirror-history";
import { Selection, TextSelection } from "prosemirror-state";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
function computeChange(oldVal, newVal) {
    if (oldVal == newVal)
        return null;
    var start = 0, oldEnd = oldVal.length, newEnd = newVal.length;
    while (start < oldEnd && oldVal.charCodeAt(start) == newVal.charCodeAt(start))
        ++start;
    while (oldEnd > start && newEnd > start &&
        oldVal.charCodeAt(oldEnd - 1) == newVal.charCodeAt(newEnd - 1)) {
        oldEnd--;
        newEnd--;
    }
    return { from: start, to: oldEnd, text: newVal.slice(start, newEnd) };
}
var CodeBlockView = /** @class */ (function () {
    function CodeBlockView(node, view, getPos) {
        var _this = this;
        // Store for later
        this.node = node;
        this.view = view;
        this.getPos = getPos;
        this.incomingChanges = false;
        // Create a CodeMirror instance
        this.cm = CodeMirror(null, {
            value: this.node.textContent,
            lineNumbers: true,
            extraKeys: this.codeMirrorKeymap()
        });
        // The editor's outer node is our DOM representation
        this.dom = this.cm.getWrapperElement();
        // CodeMirror needs to be in the DOM to properly initialize, so
        // schedule it to update itself
        setTimeout(function () { return _this.cm.refresh(); }, 20);
        // This flag is used to avoid an update loop between the outer and
        // inner editor
        this.updating = false;
        // Track whether changes are have been made but not yet propagated
        this.cm.on("beforeChange", function () { return _this.incomingChanges = true; });
        // Propagate updates from the code editor to ProseMirror
        this.cm.on("cursorActivity", function () {
            if (!_this.updating && !_this.incomingChanges)
                _this.forwardSelection();
        });
        this.cm.on("changes", function () {
            if (!_this.updating) {
                _this.valueChanged();
                _this.forwardSelection();
            }
            _this.incomingChanges = false;
        });
        this.cm.on("focus", function () { return _this.forwardSelection(); });
    }
    CodeBlockView.prototype.forwardSelection = function () {
        if (!this.cm.hasFocus())
            return;
        var state = this.view.state;
        var selection = this.asProseMirrorSelection(state.doc);
        if (!selection.eq(state.selection))
            this.view.dispatch(state.tr.setSelection(selection));
    };
    CodeBlockView.prototype.asProseMirrorSelection = function (doc) {
        var offset = this.getPos() + 1;
        var anchor = this.cm.indexFromPos(this.cm.getCursor("anchor")) + offset;
        var head = this.cm.indexFromPos(this.cm.getCursor("head")) + offset;
        return TextSelection.create(doc, anchor, head);
    };
    CodeBlockView.prototype.setSelection = function (anchor, head) {
        this.cm.focus();
        this.updating = true;
        this.cm.setSelection(this.cm.posFromIndex(anchor), this.cm.posFromIndex(head));
        this.updating = false;
    };
    CodeBlockView.prototype.valueChanged = function () {
        var change = computeChange(this.node.textContent, this.cm.getValue());
        if (change) {
            var start = this.getPos() + 1;
            var tr = this.view.state.tr.replaceWith(start + change.from, start + change.to, change.text ? this.view.state.schema.text(change.text) : null);
            this.view.dispatch(tr);
        }
    };
    CodeBlockView.prototype.codeMirrorKeymap = function () {
        var _this = this;
        var _a;
        var view = this.view;
        var mod = /Mac/.test(navigator.platform) ? "Cmd" : "Ctrl";
        return CodeMirror.normalizeKeyMap((_a = {
                Up: function () { return _this.maybeEscape("line", -1); },
                Left: function () { return _this.maybeEscape("char", -1); },
                Down: function () { return _this.maybeEscape("line", 1); },
                Right: function () { return _this.maybeEscape("char", 1); }
            },
            _a[mod + "-Z"] = function () { return undo(view.state, view.dispatch); },
            _a["Shift-" + mod + "-Z"] = function () { return redo(view.state, view.dispatch); },
            _a[mod + "-Y"] = function () { return redo(view.state, view.dispatch); },
            _a["Ctrl-Enter"] = function () {
                if (exitCode(view.state, view.dispatch))
                    view.focus();
            },
            _a));
    };
    CodeBlockView.prototype.maybeEscape = function (unit, dir) {
        var pos = this.cm.getCursor();
        if (this.cm.somethingSelected() ||
            pos.line != (dir < 0 ? this.cm.firstLine() : this.cm.lastLine()) ||
            (unit == "char" &&
                pos.ch != (dir < 0 ? 0 : this.cm.getLine(pos.line).length)))
            return CodeMirror.Pass;
        this.view.focus();
        var targetPos = this.getPos() + (dir < 0 ? 0 : this.node.nodeSize);
        var selection = Selection.near(this.view.state.doc.resolve(targetPos), dir);
        this.view.dispatch(this.view.state.tr.setSelection(selection).scrollIntoView());
        this.view.focus();
    };
    CodeBlockView.prototype.update = function (node) {
        if (node.type != this.node.type)
            return false;
        this.node = node;
        var change = computeChange(this.cm.getValue(), node.textContent);
        if (change) {
            this.updating = true;
            this.cm.replaceRange(change.text, this.cm.posFromIndex(change.from), this.cm.posFromIndex(change.to));
            this.updating = false;
        }
        return true;
    };
    CodeBlockView.prototype.selectNode = function () { this.cm.focus(); };
    CodeBlockView.prototype.stopEvent = function () { return true; };
    return CodeBlockView;
}());
export default CodeBlockView;
//# sourceMappingURL=code-block-view.js.map