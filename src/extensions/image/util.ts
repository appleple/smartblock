import { findChildren } from 'prosemirror-utils'
import { EditorState } from 'prosemirror-state'
import { Transform } from 'prosemirror-transform'

export const deleteSelectionAtPos = (
  state: EditorState,
  pos,
  dispatch
): Transform => {
  const resolvedPos = state.doc.resolve(pos) as any
  const rowNumber = resolvedPos.path[1]
  let i = 0
  const [firstNode] = findChildren(
    state.doc,
    _node => {
      if (rowNumber === i) {
        i++
        return true
      }
      i++
      return false
    },
    false
  )
  const firstIndex = firstNode.pos
  const removeTransaction = state.tr.delete(
    firstIndex,
    firstIndex + firstNode.node.content.size + 2
  )
  return removeTransaction
}

export const getNodeIndexFromPos = (doc: EditorState['doc'], pos: number) => {
  const resolvedPos = doc.resolve(pos) as any
  const rowNumber = resolvedPos.path[1]
  return rowNumber
}

export const getPosFromIndex = (doc: EditorState['doc'], index: number) => {
  let i = 0
  const [findNode] = findChildren(
    doc,
    _node => {
      if (index === i) {
        i++
        return true
      }
      i++
      return false
    },
    false
  )
  return findNode.pos
}
