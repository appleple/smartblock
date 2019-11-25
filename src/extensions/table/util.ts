import { selectionCell, TableMap, CellSelection } from 'prosemirror-tables';
import { setBlockType } from 'prosemirror-commands'

function isInTable(state) {
  let $head = state.selection.$head
  for (let d = $head.depth; d > 0; d--) if ($head.node(d).type.spec.tableRole == "row") return true
  return false
}

function selectedRect(state) {
  let sel = state.selection, $pos = selectionCell(state)
  let table = $pos.node(-1), tableStart = $pos.start(-1), map = TableMap.get(table)
  let rect
  if (sel instanceof CellSelection) {
    rect = map.rectBetween(sel.$anchorCell.pos - tableStart, sel.$headCell.pos - tableStart)
  } else {
    rect = map.findCell($pos.pos - tableStart)
  }
  rect.tableStart = tableStart
  rect.map = map
  rect.table = table
  return rect
}


function tableNodeTypes(schema) {
  let result = schema.cached.tableNodeTypes
  if (!result) {
    result = schema.cached.tableNodeTypes = {}
    for (let name in schema.nodes) {
      let type = schema.nodes[name], role = type.spec.tableRole
      if (role) result[role] = type
    }
  }
  return result
}

export function toggleCell(cellType: 'th' | 'td') {
  return function(state, dispatch) {
    if (!isInTable(state)) {
      return false
    }
    if (dispatch) {
      let types = tableNodeTypes(state.schema)
      let rect = selectedRect(state), tr = state.tr
      let cellsRect = rect
      let type = types.cell;
      if (cellType === 'th') {
        type = types.header_cell;
      }
      rect.map.cellsInRect(cellsRect).forEach(relativeCellPos => {
        const cellPos = relativeCellPos + rect.tableStart
        const cell = tr.doc.nodeAt(cellPos)

        if (cell) {
          tr.setNodeMarkup(cellPos, type, cell.attrs)
        }
      })
      dispatch(tr)
    }
    return true
  }
}