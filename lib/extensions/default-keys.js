"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_inputrules_1 = require("prosemirror-inputrules");
var prosemirror_history_1 = require("prosemirror-history");
var prosemirror_tables_1 = require("prosemirror-tables");
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_commands_1 = require("prosemirror-commands");
var utils_1 = require("../utils");
var insertBreak = function (state, dispatch) {
    var br = state.schema.nodes.hard_break.create();
    dispatch(state.tr.replaceSelectionWith(br).scrollIntoView());
    return true;
};
var insertRule = function (state, dispatch) {
    var hr = state.schema.nodes.horizontal_rule.create();
    dispatch(state.tr.replaceSelectionWith(hr).scrollIntoView());
    return true;
};
var createParagraphNear = function (state, dispatch) {
    var selection = state.selection;
    var $from = selection.$from, $to = selection.$to;
    var type = $from.parent.contentMatchAt($to.indexAfter()).defaultType;
    if (dispatch) {
        var side = (!$from.parentOffset && $to.index() < $to.parent.childCount
            ? $from
            : $to).pos;
        var tr = state.tr.delete(selection.from - 1, selection.from);
        tr = tr.insert(side, type.createAndFill());
        tr = tr.setSelection(prosemirror_state_1.TextSelection.create(tr.doc, side + 1));
        tr = tr.delete(side + 1, side + 2);
        dispatch(tr.scrollIntoView());
    }
    return true;
};
var insertBreakOrParagraph = function (state, dispatch, view) {
    var selection = state.selection;
    var $anchor = selection.$anchor;
    var nodeBefore = $anchor.nodeBefore;
    var node = (0, utils_1.getParentNodeFromState)(state);
    if (node.type.name === 'table') {
        insertBreak(state, dispatch);
        return;
    }
    if ((node.type.name !== 'paragraph' &&
        node.type.name !== 'blockquote' &&
        node.type.name !== 'code') ||
        !nodeBefore) {
        prosemirror_commands_1.baseKeymap.Enter(state, dispatch, view);
        return true;
    }
    if (nodeBefore && nodeBefore.type && nodeBefore.type.name === 'hard_break') {
        if (createParagraphNear(state, dispatch)) {
            return true;
        }
    }
    else {
        insertBreak(state, dispatch);
        return true;
    }
    return false;
};
var keys = {
    Enter: insertBreakOrParagraph,
    'Mod-z': prosemirror_history_1.undo,
    'Shift-Mod-z': prosemirror_history_1.redo,
    Backspace: prosemirror_inputrules_1.undoInputRule,
    'Mod-y': prosemirror_history_1.redo,
    'Alt-ArrowUp': prosemirror_commands_1.joinUp,
    'Alt-ArrowDown': prosemirror_commands_1.joinDown,
    'Mod-BracketLeft': prosemirror_commands_1.lift,
    Escape: prosemirror_commands_1.selectParentNode,
    'Mod-Enter': (0, prosemirror_commands_1.chainCommands)(prosemirror_commands_1.exitCode, insertBreak),
    'Shift-Enter': (0, prosemirror_commands_1.chainCommands)(prosemirror_commands_1.exitCode, insertBreak),
    'Ctrl-Enter': (0, prosemirror_commands_1.chainCommands)(prosemirror_commands_1.exitCode, insertBreak),
    'Mod-_': insertRule,
    Tab: (0, prosemirror_tables_1.goToNextCell)(1),
    'Shift-Tab': (0, prosemirror_tables_1.goToNextCell)(-1)
};
Object.keys(prosemirror_commands_1.baseKeymap).forEach(function (key) {
    if (keys[key]) {
        if (key !== 'Enter') {
            keys[key] = (0, prosemirror_commands_1.chainCommands)(keys[key], prosemirror_commands_1.baseKeymap[key]);
        }
    }
    else {
        keys[key] = prosemirror_commands_1.baseKeymap[key];
    }
});
var DefaultKeys = /** @class */ (function () {
    function DefaultKeys() {
    }
    Object.defineProperty(DefaultKeys.prototype, "name", {
        get: function () {
            return 'default-keys';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DefaultKeys.prototype, "showMenu", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    DefaultKeys.prototype.keys = function () {
        return keys;
    };
    return DefaultKeys;
}());
exports.default = DefaultKeys;
//# sourceMappingURL=default-keys.js.map