import { undoInputRule } from 'prosemirror-inputrules';
import { undo, redo } from 'prosemirror-history';
import { goToNextCell } from 'prosemirror-tables';
import { baseKeymap, chainCommands, exitCode, joinUp, joinDown, lift, selectParentNode } from 'prosemirror-commands';
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
    'Mod-z': undo,
    'Shift-Mod-z': redo,
    'Backspace': undoInputRule,
    'Mod-y': redo,
    'Alt-ArrowUp': joinUp,
    'Alt-ArrowDown': joinDown,
    'Mod-BracketLeft': lift,
    'Escape': selectParentNode,
    'Mod-Enter': chainCommands(exitCode, insertBreak),
    'Shift-Enter': chainCommands(exitCode, insertBreak),
    'Ctrl-Enter': chainCommands(exitCode, insertBreak),
    'Mod-_': insertRule,
    'Tab': goToNextCell(1),
    'Shift-Tab': goToNextCell(-1)
};
Object.keys(baseKeymap).forEach(function (key) {
    if (keys[key]) {
        keys[key] = chainCommands(keys[key], baseKeymap[key]);
    }
    else {
        keys[key] = baseKeymap[key];
    }
});
export default keys;
//# sourceMappingURL=keys.js.map