"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_tables_1 = require("prosemirror-tables");
function isInTable(state) {
    var $head = state.selection.$head;
    for (var d = $head.depth; d > 0; d--) {
        // @ts-ignore
        if ($head.node(d).type.spec.tableRole == "row") {
            return true;
        }
    }
    return false;
}
function selectedRect(state) {
    var sel = state.selection;
    var $pos = prosemirror_tables_1.selectionCell(state);
    var table = $pos.node(-1);
    var tableStart = $pos.start(-1);
    var map = prosemirror_tables_1.TableMap.get(table);
    var rect;
    if (sel instanceof prosemirror_tables_1.CellSelection) {
        // @ts-ignore
        rect = map.rectBetween(sel.$anchorCell.pos - tableStart, sel.$headCell.pos - tableStart);
    }
    else {
        rect = map.findCell($pos.pos - tableStart);
    }
    rect.tableStart = tableStart;
    rect.map = map;
    rect.table = table;
    return rect;
}
function tableNodeTypes(schema) {
    var result = schema.cached.tableNodeTypes;
    if (!result) {
        result = schema.cached.tableNodeTypes = {};
        for (var name_1 in schema.nodes) {
            // @ts-ignore
            var type = schema.nodes[name_1], role = type.spec.tableRole;
            if (role) {
                result[role] = type;
            }
        }
    }
    return result;
}
function toggleCell(cellType) {
    return function (state, dispatch) {
        if (!isInTable(state)) {
            return false;
        }
        if (dispatch) {
            var types = tableNodeTypes(state.schema);
            var rect_1 = selectedRect(state), tr_1 = state.tr;
            var cellsRect = rect_1;
            var type_1 = types.cell;
            if (cellType === 'th') {
                type_1 = types.header_cell;
            }
            rect_1.map.cellsInRect(cellsRect).forEach(function (relativeCellPos) {
                var cellPos = relativeCellPos + rect_1.tableStart;
                var cell = tr_1.doc.nodeAt(cellPos);
                if (cell) {
                    tr_1.setNodeMarkup(cellPos, type_1, cell.attrs);
                }
            });
            dispatch(tr_1);
        }
        return true;
    };
}
exports.toggleCell = toggleCell;
//# sourceMappingURL=util.js.map