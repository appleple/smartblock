import { Extension } from '../types'
import { undoInputRule } from 'prosemirror-inputrules'
import { undo, redo } from 'prosemirror-history'
import { goToNextCell } from 'prosemirror-tables'
import { EditorState, TextSelection } from 'prosemirror-state'
import {
  baseKeymap,
  chainCommands,
  exitCode,
  joinUp,
  joinDown,
  lift,
  pcBaseKeymap,
  selectParentNode
} from 'prosemirror-commands'
import { getParentNodeFromState, getBrowser } from '../utils'

const insertBreak = (state, dispatch) => {
  const br = state.schema.nodes.hard_break.create()
  dispatch(state.tr.replaceSelectionWith(br).scrollIntoView())
  return true
}

const insertRule = (state, dispatch) => {
  const hr = state.schema.nodes.horizontal_rule.create()
  dispatch(state.tr.replaceSelectionWith(hr).scrollIntoView())
  return true
}

const createParagraphNear = (state, dispatch) => {
  const { selection } = state
  const { $from, $to } = selection
  const type = $from.parent.contentMatchAt($to.indexAfter()).defaultType
  if (dispatch) {
    const side = (!$from.parentOffset && $to.index() < $to.parent.childCount
      ? $from
      : $to
    ).pos
    let tr = state.tr.delete(selection.from - 1, selection.from)
    tr = tr.insert(side, type.createAndFill())
    tr = tr.setSelection(TextSelection.create(tr.doc, side + 1))
    tr = tr.delete(side + 1, side + 2)
    dispatch(tr.scrollIntoView())
  }
  return true
}

const insertBreakOrParagraph = (state: EditorState, dispatch, view) => {
  const { selection } = state
  const { $anchor } = selection
  const { nodeBefore } = $anchor
  const node = getParentNodeFromState(state)
  if (node.type.name === 'table') {
    insertBreak(state, dispatch)
    return
  }
  if ((node.type.name !== 'paragraph' && node.type.name !== 'blockquote') || !nodeBefore) {
    baseKeymap.Enter(state, dispatch, view)
    return true
  }
  if (nodeBefore && nodeBefore.type && nodeBefore.type.name === 'hard_break') {
    if (createParagraphNear(state, dispatch)) {
      return true
    }
  } else {
    insertBreak(state, dispatch)
    return true
  }
  return false
}

const keys = {
  'Enter': getBrowser().indexOf('ie') !== -1 ? pcBaseKeymap.Enter : insertBreakOrParagraph,
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
  'Ctrl-Enter': chainCommands(exitCode, insertBreak), // mac-only?
  'Mod-_': insertRule,
  'Tab': goToNextCell(1),
  'Shift-Tab': goToNextCell(-1)
}

Object.keys(baseKeymap).forEach(key => {
  if (keys[key]) {
    if (key !== 'Enter') {
      keys[key] = chainCommands(keys[key], baseKeymap[key])
    }
  } else {
    keys[key] = baseKeymap[key]
  }
})

export default class DefaultKeys implements Extension {
  get name() {
    return 'default-keys';
  }
  get showMenu() {
    return false;
  }
  keys() {
    return keys;
  }
}
