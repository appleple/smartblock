import { selectionCell, TableMap, CellSelection } from 'prosemirror-tables';
import { EditorState } from 'prosemirror-state';
import { Schema } from 'prosemirror-model';
import { Dispatch } from '../..';

function isInTable(state: EditorState) {
  const $head = state.selection.$head
  for (let d = $head.depth; d > 0; d--) {
    // @ts-ignore
    if ($head.node(d).type.spec.tableRole == "row") {
      return true;
    }
  }
  return false;
}

function selectedRect(state: EditorState) {
  const sel = state.selection;
  const $pos = selectionCell(state);
  const table = $pos.node(-1);
  const tableStart = $pos.start(-1);
  const map = TableMap.get(table);
  let rect;
  if (sel instanceof CellSelection) {
    // @ts-ignore
    rect = map.rectBetween(sel.$anchorCell.pos - tableStart, sel.$headCell.pos - tableStart);
  } else {
    rect = map.findCell($pos.pos - tableStart);
  }
  rect.tableStart = tableStart;
  rect.map = map;
  rect.table = table;
  return rect;
}


function tableNodeTypes(schema: Schema) {
  let result = schema.cached.tableNodeTypes;
  if (!result) {
    result = schema.cached.tableNodeTypes = {};
    for (const name in schema.nodes) {
      // @ts-ignore
      const type = schema.nodes[name], role = type.spec.tableRole;
      if (role) {
        result[role] = type;
      }
    }
  }
  return result;
}

export function toggleCell(cellType: 'th' | 'td') {
  return function(state: EditorState, dispatch: Dispatch) {
    if (!isInTable(state)) {
      return false;
    }
    if (dispatch) {
      const types = tableNodeTypes(state.schema);
      const rect = selectedRect(state), tr = state.tr;
      const cellsRect = rect;
      let type = types.cell;
      if (cellType === 'th') {
        type = types.header_cell;
      }
      rect.map.cellsInRect(cellsRect).forEach(relativeCellPos => {
        const cellPos = relativeCellPos + rect.tableStart;
        const cell = tr.doc.nodeAt(cellPos);

        if (cell) {
          tr.setNodeMarkup(cellPos, type, cell.attrs);
        }
      })
      dispatch(tr);
    }
    return true;
  }
}