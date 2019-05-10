"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_inputrules_1 = require("prosemirror-inputrules");
var prosemirror_history_1 = require("prosemirror-history");
var prosemirror_tables_1 = require("prosemirror-tables");
var prosemirror_commands_1 = require("prosemirror-commands");
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
var keys = {
    'Mod-z': prosemirror_history_1.undo,
    'Shift-Mod-z': prosemirror_history_1.redo,
    'Backspace': prosemirror_inputrules_1.undoInputRule,
    'Mod-y': prosemirror_history_1.redo,
    'Alt-ArrowUp': prosemirror_commands_1.joinUp,
    'Alt-ArrowDown': prosemirror_commands_1.joinDown,
    'Mod-BracketLeft': prosemirror_commands_1.lift,
    'Escape': prosemirror_commands_1.selectParentNode,
    'Mod-Enter': prosemirror_commands_1.chainCommands(prosemirror_commands_1.exitCode, insertBreak),
    'Shift-Enter': prosemirror_commands_1.chainCommands(prosemirror_commands_1.exitCode, insertBreak),
    'Ctrl-Enter': prosemirror_commands_1.chainCommands(prosemirror_commands_1.exitCode, insertBreak),
    'Mod-_': insertRule,
    'Tab': prosemirror_tables_1.goToNextCell(1),
    'Shift-Tab': prosemirror_tables_1.goToNextCell(-1)
};
Object.keys(prosemirror_commands_1.baseKeymap).forEach(function (key) {
    if (keys[key]) {
        keys[key] = prosemirror_commands_1.chainCommands(keys[key], prosemirror_commands_1.baseKeymap[key]);
    }
    else {
        keys[key] = prosemirror_commands_1.baseKeymap[key];
    }
});
exports.default = keys;
//# sourceMappingURL=keys.js.map