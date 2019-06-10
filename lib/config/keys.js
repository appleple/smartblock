import { undoInputRule } from 'prosemirror-inputrules';
import { undo, redo } from 'prosemirror-history';
import { goToNextCell } from 'prosemirror-tables';
import { TextSelection } from 'prosemirror-state';
import { baseKeymap, chainCommands, exitCode, joinUp, joinDown, lift, selectParentNode } from 'prosemirror-commands';
import { getParentNodeFromState } from '../utils';
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
        tr = tr.setSelection(TextSelection.create(tr.doc, side + 1));
        tr = tr.delete(side + 1, side + 2);
        dispatch(tr.scrollIntoView());
    }
    return true;
};
var insertBreakOrParagraph = function (state, dispatch, view) {
    var selection = state.selection;
    var $anchor = selection.$anchor;
    var nodeBefore = $anchor.nodeBefore;
    var node = getParentNodeFromState(state);
    if (node.type.name === 'table') {
        insertBreak(state, dispatch);
        return;
    }
    if (node.type.name !== 'paragraph' || !nodeBefore) {
        baseKeymap.Enter(state, dispatch, view);
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
    'Mod-z': undo,
    'Shift-Mod-z': redo,
    Backspace: undoInputRule,
    'Mod-y': redo,
    'Alt-ArrowUp': joinUp,
    'Alt-ArrowDown': joinDown,
    'Mod-BracketLeft': lift,
    Escape: selectParentNode,
    'Mod-Enter': chainCommands(exitCode, insertBreak),
    'Shift-Enter': chainCommands(exitCode, insertBreak),
    'Ctrl-Enter': chainCommands(exitCode, insertBreak),
    'Mod-_': insertRule,
    Tab: goToNextCell(1),
    'Shift-Tab': goToNextCell(-1)
};
Object.keys(baseKeymap).forEach(function (key) {
    if (keys[key]) {
        if (key !== 'Enter') {
            keys[key] = chainCommands(keys[key], baseKeymap[key]);
        }
    }
    else {
        keys[key] = baseKeymap[key];
    }
});
export default keys;
//# sourceMappingURL=keys.js.map